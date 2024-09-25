/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ERC1967Proxy, ERC1967ProxyInterface } from "../ERC1967Proxy";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "uniqueId",
        type: "bytes",
      },
    ],
    name: "OverplusBridged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "payoutStart",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "decreaseInterval",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "withdrawLockPeriod",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "claimLockPeriod",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "withdrawLockPeriodAfterStake",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "initialReward",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardDecrease",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minimalStake",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isPublic",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct IDistributionV4.Pool",
        name: "pool",
        type: "tuple",
      },
    ],
    name: "PoolCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "payoutStart",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "decreaseInterval",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "withdrawLockPeriod",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "claimLockPeriod",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "withdrawLockPeriodAfterStake",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "initialReward",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardDecrease",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minimalStake",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isPublic",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct IDistributionV4.Pool",
        name: "pool",
        type: "tuple",
      },
    ],
    name: "PoolEdited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "claimLockPeriodAfterStake",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "claimLockPeriodAfterClaim",
            type: "uint128",
          },
        ],
        indexed: false,
        internalType: "struct IDistributionV4.PoolLimits",
        name: "poolLimit",
        type: "tuple",
      },
    ],
    name: "PoolLimitsEdited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "claimLockStart",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "claimLockEnd",
        type: "uint128",
      },
    ],
    name: "UserClaimLocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "UserClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "UserStaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "UserWithdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "depositToken_",
        type: "address",
      },
      {
        internalType: "address",
        name: "l1Sender_",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "payoutStart",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "decreaseInterval",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "withdrawLockPeriod",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "claimLockPeriod",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "withdrawLockPeriodAfterStake",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "initialReward",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardDecrease",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minimalStake",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isPublic",
            type: "bool",
          },
        ],
        internalType: "struct IDistributionV4.Pool[]",
        name: "poolsInfo_",
        type: "tuple[]",
      },
    ],
    name: "Distribution_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasLimit_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxFeePerGas_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxSubmissionCost_",
        type: "uint256",
      },
    ],
    name: "bridgeOverplus",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver_",
        type: "address",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "payoutStart",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "decreaseInterval",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "withdrawLockPeriod",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "claimLockPeriod",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "withdrawLockPeriodAfterStake",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "initialReward",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardDecrease",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minimalStake",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isPublic",
            type: "bool",
          },
        ],
        internalType: "struct IDistributionV4.Pool",
        name: "pool_",
        type: "tuple",
      },
    ],
    name: "createPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "payoutStart",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "decreaseInterval",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "withdrawLockPeriod",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "claimLockPeriod",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "withdrawLockPeriodAfterStake",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "initialReward",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardDecrease",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minimalStake",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isPublic",
            type: "bool",
          },
        ],
        internalType: "struct IDistributionV4.Pool",
        name: "pool_",
        type: "tuple",
      },
    ],
    name: "editPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint128",
            name: "claimLockPeriodAfterStake",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "claimLockPeriodAfterClaim",
            type: "uint128",
          },
        ],
        internalType: "struct IDistributionV4.PoolLimits",
        name: "poolLimits_",
        type: "tuple",
      },
    ],
    name: "editPoolLimits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "claimLockStart_",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "claimLockEnd_",
        type: "uint128",
      },
    ],
    name: "getClaimLockPeriodMultiplier",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user_",
        type: "address",
      },
    ],
    name: "getCurrentUserMultiplier",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user_",
        type: "address",
      },
    ],
    name: "getCurrentUserReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "startTime_",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "endTime_",
        type: "uint128",
      },
    ],
    name: "getPeriodReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isNotUpgradeable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "l1Sender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "claimLockEnd_",
        type: "uint128",
      },
    ],
    name: "lockClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "users_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts_",
        type: "uint256[]",
      },
      {
        internalType: "uint128[]",
        name: "claimLockEnds_",
        type: "uint128[]",
      },
    ],
    name: "manageUsersInPrivatePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "overplus",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pools",
    outputs: [
      {
        internalType: "uint128",
        name: "payoutStart",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "decreaseInterval",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "withdrawLockPeriod",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "claimLockPeriod",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "withdrawLockPeriodAfterStake",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "initialReward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardDecrease",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minimalStake",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isPublic",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "poolsData",
    outputs: [
      {
        internalType: "uint128",
        name: "lastUpdate",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalVirtualDeposited",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "poolsLimits",
    outputs: [
      {
        internalType: "uint128",
        name: "claimLockPeriodAfterStake",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "claimLockPeriodAfterClaim",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "removeUpgradeability",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "claimLockEnd_",
        type: "uint128",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDepositedInPublicPools",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "usersData",
    outputs: [
      {
        internalType: "uint128",
        name: "lastStake",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "deposited",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pendingRewards",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "claimLockStart",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "claimLockEnd",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "virtualDeposited",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "lastClaim",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "poolId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ERC1967Proxy__factory {
  static readonly abi = _abi;
  static createInterface(): ERC1967ProxyInterface {
    return new utils.Interface(_abi) as ERC1967ProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1967Proxy {
    return new Contract(address, _abi, signerOrProvider) as ERC1967Proxy;
  }
}
