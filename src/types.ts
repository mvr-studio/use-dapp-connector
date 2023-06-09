import { GetNetworkId, WalletApi, WalletName } from '@cardano-sdk/dapp-connector'

export enum NetworkId {
  Mainnet = 1,
  Testnet = 0
}

type IsEnabled = Promise<boolean>
type InitialApiEnable = () => Promise<WalletApi>
export type InitialApiIsEnabled = () => IsEnabled
export type InternalEnable = () => Promise<void>
type ApiVersion = string
type Icon = string

export interface InitialApi {
  apiVersion: ApiVersion
  enable: InitialApiEnable
  name: WalletName
  icon: Icon
  isEnabled: InitialApiIsEnabled
}

export interface UseDappConnectorProps {
  walletName: WalletName
  limitNetwork?: NetworkId | null
  throwable?: boolean
}

export interface UseDappConnectorReturns {
  walletApi: WalletApi | null
  enable: InternalEnable
  isEnabled: boolean
  isEnabling: boolean
  isReady: boolean
  apiVersion: ApiVersion
  name: WalletName
  icon: Icon
  error: Error | null
}
