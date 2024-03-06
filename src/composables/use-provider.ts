import { type ETHEREUM_CHAINS } from '@/enums'
import { errors } from '@/errors'
import { sleep } from '@/helpers'
import { config, type Chain } from '@config'
// TODO: remove after update type 'Chain' of @distributedlab/w3p
import {
  CHAIN_TYPES,
  Provider,
  ProviderDetector,
  createProvider,
  // TODO: remove after update type 'Chain' of @distributedlab/w3p
  type Chain as ChainW3P,
  type ChainId,
  type CreateProviderOpts,
  type PROVIDERS,
  type ProviderInstance,
  type ProviderProxyConstructor,
  type RawProvider,
  type TransactionResponse,
  type TxRequestBody,
} from '@distributedlab/w3p'
import {
  computed,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  type Ref,
  type UnwrapRef,
} from 'vue'

export interface IUseProvider {
  selectedAddress: Ref<string>
  selectedProvider: Ref<PROVIDERS | null>
  rawProvider: Ref<RawProvider | null>
  chainId: Ref<ChainId | null>

  isChainSelecting: Ref<boolean>
  isConnected: Ref<boolean>
  isConnecting: Ref<boolean>

  connect: () => Promise<void>
  disconnect: () => Promise<void>
  addChain: (chain: Chain) => Promise<void>
  addProvider: (provider: ProviderInstance) => void
  switchChain: (chainId: ChainId) => Promise<void>
  selectChain: (chainId: ChainId) => Promise<void>
  request: (body: {
    method: string
    params?: unknown[] | object
  }) => Promise<unknown>

  // TODO: to discuss: chain as arg
  getAddressUrl: (chain: Chain, address: string) => string

  getHashFromTxResponse: (txResponse: TransactionResponse) => string

  // TODO: to discuss: chain as arg
  getTxUrl: (chain: Chain, txHash: string) => string

  signAndSendTx: (txRequestBody: TxRequestBody) => Promise<TransactionResponse>
  signMessage: (message: string) => Promise<string | null>

  init: <T extends keyof Record<string, string>>(
    providerProxyConstructor: ProviderProxyConstructor,
    createProviderOpts?: CreateProviderOpts<T>,
  ) => Promise<void>
}

type ProviderState = {
  selectedAddress: UnwrapRef<IUseProvider['selectedAddress']>
  selectedProvider: UnwrapRef<IUseProvider['selectedProvider']>
  rawProvider: UnwrapRef<IUseProvider['rawProvider']>
  chainId: UnwrapRef<IUseProvider['chainId']>
  isConnected: UnwrapRef<IUseProvider['isConnected']>
}

export const useProvider = (): IUseProvider => {
  type I = IUseProvider
  let _provider: Provider | null = null

  const _providerReactiveState = reactive<ProviderState>({
    selectedAddress: '',
    selectedProvider: null,
    rawProvider: null,
    chainId: '',
    isConnected: false,
  })

  const _updateProviderState = (): void => {
    _providerReactiveState.selectedAddress = _provider?.address || ''
    _providerReactiveState.selectedProvider = _provider?.providerType || null
    _providerReactiveState.rawProvider = _provider?.rawProvider || null
    _providerReactiveState.chainId = _provider?.chainId
      ? String(_provider?.chainId)
      : ''
    _providerReactiveState.isConnected = _provider?.isConnected || false
  }

  const isConnecting: I['isConnecting'] = ref(false)
  const connect: I['connect'] = async () => {
    if (!_provider?.connect) throw new errors.ProviderMethodNotFound()

    isConnecting.value = true

    try {
      await _provider.connect()
    } finally {
      isConnecting.value = false
    }
  }

  const disconnect: I['disconnect'] = async () => {
    if (!_provider?.disconnect) throw new errors.ProviderMethodNotFound()
    await _provider.disconnect()
  }

  const addChain: I['addChain'] = async chain => {
    if (!_provider?.addChain) throw new errors.ProviderMethodNotFound()
    await _provider.addChain(_parseChainToChainW3P(chain))
  }

  const addProvider: I['addProvider'] = provider => {
    if (_detector.value.providers?.[provider.name]) return
    _detector.value.addProvider(provider)
  }

  const switchChain: I['switchChain'] = async chainId => {
    if (!_provider?.switchChain) throw new errors.ProviderMethodNotFound()
    await _provider.switchChain(chainId)
  }

  const isChainSelecting: I['isChainSelecting'] = ref(false)
  const selectChain: I['selectChain'] = async chainId => {
    isChainSelecting.value = true

    try {
      await switchChain(Number(chainId))
    } catch (error) {
      if (error instanceof errors.ProviderUserRejectedRequest) throw error

      await addChain(config.chainsMap[chainId as ETHEREUM_CHAINS])

      // onChainChanged provider event needs time for execute
      await sleep(1000)
      // it's being used in case if user has added chain, but hasn't switched
      if (_providerReactiveState.chainId !== chainId)
        throw new errors.ProviderUserRejectedRequest()
    } finally {
      isChainSelecting.value = false
    }
  }

  const request: I['request'] = async body => {
    // eslint-disable-next-line
    // @ts-ignore
    if (!_provider?.rawProvider?.request)
      throw new errors.ProviderMethodNotFound()

    // eslint-disable-next-line
    // @ts-ignore
    return _provider.rawProvider.request(body)
  }

  const getAddressUrl: I['getAddressUrl'] = (chain, address) => {
    if (!_provider?.getAddressUrl) throw new errors.ProviderMethodNotFound()
    return _provider.getAddressUrl(_parseChainToChainW3P(chain), address)
  }

  const getHashFromTxResponse: I['getHashFromTxResponse'] = txResponse => {
    if (!_provider?.getHashFromTx) throw new errors.ProviderMethodNotFound()
    return _provider.getHashFromTx(txResponse)
  }

  const getTxUrl: I['getTxUrl'] = (chain, txHash) => {
    if (!_provider?.getTxUrl) throw new errors.ProviderMethodNotFound()
    return _provider.getTxUrl(_parseChainToChainW3P(chain), txHash)
  }

  const signAndSendTx: I['signAndSendTx'] = async txRequestBody => {
    if (!_provider?.signAndSendTx) throw new errors.ProviderMethodNotFound()
    return _provider.signAndSendTx(txRequestBody)
  }

  const signMessage: I['signMessage'] = async message => {
    if (!_provider?.signMessage) throw new errors.ProviderMethodNotFound()
    return _provider.signMessage(message)
  }

  const _detector = computed<ProviderDetector<PROVIDERS>>(
    () => new ProviderDetector<PROVIDERS>(),
  )

  async function init(
    ...[providerProxyConstructor, createProviderOpts]: Parameters<I['init']>
  ): ReturnType<I['init']> {
    await _detector.value.init()

    _provider = await createProvider(providerProxyConstructor, {
      providerDetector: createProviderOpts?.providerDetector ?? _detector.value,
      listeners: {
        ...createProviderOpts?.listeners,
        onAccountChanged: () => {
          createProviderOpts?.listeners?.onAccountChanged?.()
          _updateProviderState()
        },
        onChainChanged: () => {
          createProviderOpts?.listeners?.onChainChanged?.()
          _updateProviderState()
        },
        onConnect: () => {
          createProviderOpts?.listeners?.onConnect?.()
          _updateProviderState()
        },
        onDisconnect: () => {
          createProviderOpts?.listeners?.onDisconnect?.()
          _updateProviderState()
        },
      },
    })

    _updateProviderState()
  }

  onUnmounted(() => {
    if (_providerReactiveState.selectedProvider) return
    _provider?.clearHandlers()
  })

  return {
    ...toRefs(_providerReactiveState),
    isChainSelecting,
    isConnecting,

    connect,
    disconnect,
    addChain,
    addProvider,
    switchChain,
    selectChain,
    request,

    getAddressUrl,
    getHashFromTxResponse,
    getTxUrl,

    signAndSendTx,
    signMessage,

    init,
  }
}

// TODO: remove after update type 'Chain' of @distributedlab/w3p
function _parseChainToChainW3P(chain: Chain): ChainW3P {
  return {
    id: Number(chain.chainId),
    name: chain.chainName,
    type: CHAIN_TYPES.EVM,
    token: {
      name: chain.nativeCurrency.name,
      symbol: chain.nativeCurrency.symbol,
      decimals: chain.nativeCurrency.decimals,
    },
    rpcUrl: chain.rpcUrls[0],
    explorerUrl: chain.blockExplorerUrls?.[0] || '',
    icon: '',
  }
}
