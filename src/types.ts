import { GetNetworkId, WalletApi } from '@cardano-sdk/dapp-connector'

type WalletName = string

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
}

export interface UseDappConnectorReturns {
  api: WalletApi | null
  enable: InternalEnable
  isEnabled: boolean
  apiVersion: ApiVersion
  name: WalletName
  icon: Icon
}