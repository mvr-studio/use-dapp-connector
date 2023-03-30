# Cardano DApp Connector Hook

## Installation

```sh
yarn add @mvr-studio/use-dapp-connector
```

## Usage

```tsx
import { useDappConnector } from '@mvr-studio/use-dapp-connector'
// walletName - any CIP-30 compatible Cardano wallet.
const { enable, isEnabled, apiVersion, name, icon, api } = useDappConnector({ walletName: 'lace' })

const fetchNetworkId = async () => {
  const networkId = await api?.getNetworkId()
  // Do something with networkId
}
```
