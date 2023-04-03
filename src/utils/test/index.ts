import { WalletApi } from '@cardano-sdk/dapp-connector'

const mockWalletApi = (): WalletApi => ({
  getNetworkId: jest.fn(() => Promise.resolve(1)),
  getUtxos: jest.fn(() => Promise.resolve([])),
  getBalance: jest.fn(() => Promise.resolve('00')),
  getCollateral: jest.fn(() => Promise.resolve([])),
  getUsedAddresses: jest.fn(() => Promise.resolve([])),
  getUnusedAddresses: jest.fn(() => Promise.resolve([])),
  getChangeAddress: jest.fn(() => Promise.resolve('')),
  getRewardAddresses: jest.fn(() => Promise.resolve([])),
  signTx: jest.fn(),
  signData: jest.fn(),
  submitTx: jest.fn()
})

interface MockWalletProps {
  walletName: string
}

export const mockInitialApi = ({ walletName }: MockWalletProps) => ({
  name: walletName,
  icon: 'icon',
  apiVersion: '0.1.0',
  enable: jest.fn(() => Promise.resolve(mockWalletApi())),
  isEnabled: jest.fn(() => Promise.resolve(true))
})
