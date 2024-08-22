import { BigNumber, hexlify, Time } from '@/utils'
import { gql } from '@apollo/client'
import { config, NETWORK_IDS } from '@config'
import { mapKeys, mapValues } from 'lodash'

type ChartData = Record<number, BigNumber>

const ONE_DAY_TIMESTAMP = 24 * 60 * 60
const DECIMAL = BigNumber.from(10).pow(25)

export async function getChartData(
  poolId: number,
  poolStartedAt: BigNumber,
  month: number,
  type: NETWORK_IDS,
): Promise<ChartData> {
  type QueryData = Record<`r${number}`, { totalStaked?: string }[]>
  const query = {
    query: _generateTotalStakedPerDayGraphqlQuery(poolId, poolStartedAt, month),
  }
  const { data } =
    type === NETWORK_IDS.mainnet
      ? await config.mainnetApolloClient.query<QueryData>(query)
      : await config.testnetApolloClient.query<QueryData>(query)

  return mapValues(
    mapKeys(data, (_, key) => key.slice(1)),
    value => BigNumber.from(value[0]?.totalStaked ?? 0),
  )
}

function _generateTotalStakedPerDayGraphqlQuery(
  poolId: number,
  poolStartedAt: BigNumber,
  month: number,
) {
  const REQUEST_PATTERN = `d{{date}}:
    poolInteractions(
        first: 1
        orderDirection: desc
        where: {timestamp_lte: "{{timestamp}}", pool: "${hexlify(poolId)}"}
        orderBy: timestamp
      ) {
        totalStaked
      }`

  const monthTime = new Time(String(month + 1), 'M')
  const currentTime = new Time()
  const poolStartedAtTime = new Time(poolStartedAt.toNumber())

  const startDate = monthTime.isSame(poolStartedAtTime, 'month')
    ? poolStartedAtTime.get('date')
    : 1

  const endDate = currentTime.isSame(monthTime, 'month')
    ? currentTime.get('date')
    : monthTime.dayjs.daysInMonth()

  const requests = []
  for (let date = startDate; date <= endDate; date++) {
    const timestamp = monthTime.timestamp + date * ONE_DAY_TIMESTAMP

    // eslint-disable-next-line prettier/prettier
    const request = REQUEST_PATTERN
      .replace('{{date}}', date.toString())
      // eslint-disable-next-line prettier/prettier
      .replace('{{timestamp}}', timestamp.toString())

    requests.push(request)
  }

  return gql`
    ${'{\n' + requests.join('\n') + '\n}'}
  `
}

export async function getUserYieldPerDayChartData(
  poolId: number,
  user: string,
  month: number,
  type: NETWORK_IDS,
): Promise<ChartData> {
  type PoolInteraction = {
    timestamp: string
    rate: string
  }

  type UserInteraction = {
    timestamp: string
    rate: string
    deposited: string
    claimedRewards: string
    pendingRewards: string
  }

  type QueryData = {
    initialUserInteractions: UserInteraction[]
    userInteractions: UserInteraction[]
    [key: string]: PoolInteraction[]
  }

  const query = {
    query: _generateUserYieldPerDayGraphqlQuery(poolId, user, month),
  }

  const apolloClient =
    type === NETWORK_IDS.mainnet
      ? config.mainnetApolloClient
      : config.testnetApolloClient

  const { data } = await apolloClient.query<QueryData>(query)

  const poolInteractions: PoolInteraction[] = Object.keys(data)
    .filter(prop => prop.includes('day') && data[prop].length > 0)
    .map(prop => data[prop][0])

  const userInteractions = [
    ...data.initialUserInteractions.slice(0, 1),
    ...data.userInteractions,
  ]

  const fromDate = new Time(String(month + 1), 'M').toDate()
  const fromTimestamp = fromDate.getTime() / 1000

  const yields: ChartData = {}

  userInteractions.forEach((userInteraction, index) => {
    const nextUserInteraction = userInteractions[index + 1]

    const userInteractionValue = BigNumber.from(
      userInteraction.claimedRewards,
    ).add(userInteraction.pendingRewards)

    if (Number(userInteraction.timestamp) > fromTimestamp) {
      yields[Number(userInteraction.timestamp)] = userInteractionValue
    }

    const periodPoolInteractions = poolInteractions.filter(
      poolInteraction =>
        Number(poolInteraction.timestamp) > Number(userInteraction.timestamp) &&
        (!nextUserInteraction ||
          Number(poolInteraction.timestamp) <
            Number(nextUserInteraction.timestamp)),
    )

    periodPoolInteractions.forEach(poolInteraction => {
      const rateDiff = BigNumber.from(poolInteraction.rate).sub(
        userInteraction.rate,
      )
      const periodReward = BigNumber.from(userInteraction.deposited)
        .mul(rateDiff)
        .div(DECIMAL)

      yields[Number(poolInteraction.timestamp)] =
        userInteractionValue.add(periodReward)
    })
  })

  return yields
}

function _generateUserYieldPerDayGraphqlQuery(
  poolId: number,
  user: string,
  // TODO: add month
  month: number,
) {
  const fromDate = new Time(String(month + 1), 'M').toDate()
  const toDate = new Time(String(month + 2), 'M').toDate()
  const fromTimestamp = fromDate.getTime() / 1000
  const toTimestamp = toDate.getTime() / 1000

  const userInteractionsPattern = `
   initialUserInteractions: userInteractions (
      orderBy: timestamp
      orderDirection: desc
      where: {
        user: "${user}"
        poolId: "${poolId.toString()}"
        timestamp_lt: ${fromTimestamp}
      }
      first: 1
    ) {
      timestamp
      rate
      deposited
      claimedRewards
      pendingRewards
    }
    userInteractions (
      orderBy: timestamp
      orderDirection: asc
      where: {
        user: "${user}"
        poolId: "${poolId.toString()}"
        timestamp_gt: ${fromTimestamp}
        timestamp_lt: ${toTimestamp}
      }
    ) {
      timestamp
      rate
      deposited
      claimedRewards
      pendingRewards
    }
  `

  const year = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  const dateInMonth =
    currentMonth === month
      ? new Date().getDate()
      : new Date(year, month + 1, 0).getDate()

  let poolInteractionsPattern = ''
  for (let i = 1; i <= dateInMonth; i++) {
    poolInteractionsPattern += `
      day${i}: poolInteractions (
        orderBy: timestamp
        orderDirection: desc
        where: {
          rate_gt: 0
          timestamp_lt: ${fromTimestamp + i * 86400}
          pool_: {
            id: "${hexlify(poolId)}"
          }
        }
        first: 1
      ) {
        timestamp
        rate
      }
    `
  }

  const requests = [userInteractionsPattern, poolInteractionsPattern]

  return gql`
    ${'{\n' + requests.join('\n') + '\n}'}
  `
}
