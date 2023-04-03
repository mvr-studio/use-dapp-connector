# Cardano DApp Connector Hooks

A little easier DApp Connector experience for React.

## Installation

```sh
yarn add @mvr-studio/use-dapp-connector
```

## useDappConnector

Use a Cardano wallet available in `window.cardano`.

```tsx
import { useDappConnector } from '@mvr-studio/use-dapp-connector'
// walletName - any CIP-30 compatible Cardano wallet.
const Component = () => {
  const { walletApi, enable, isEnabled, isEnabling, error, isReady, apiVersion, name, icon } = useDappConnector({
    walletName: 'lace'
  })

  const fetchNetworkId = async () => {
    const networkId = await api?.getNetworkId()
    // Do something with networkId
  }
}
```

### useDappConnector Props

| Name         | Type                     | Default | Description                                                         |
| ------------ | ------------------------ | ------- | ------------------------------------------------------------------- |
| walletName   | `Wallet Name` (`string`) |         | Name of wallet to enable                                            |
| limitNetwork | `NetworkId` (`number`)   | `null`  | Limit network to Mainnet (`1`) or Preprod/Preview (`0`)             |
| throwable    | `boolean`                | `false` | Should throw errors (`true`) or just leave them in `error` variable |

---

## useCardanoWallets

It helps to list all Cardano wallets discoverable in `window.cardano`.

### Simple use

Lists all Cardano wallets under `wallets`.

```tsx
import { useCardanoWallets } from '@mvr-studio/use-dapp-connector'

const Component = () => {
  const { wallets } = useCardanoWallets()
}
```

### Allowlist

Lists wallets allowed by `allowlist` in `wallets`.

```tsx
import { useCardanoWallets } from '@mvr-studio/use-dapp-connector'

const Component = () => {
  // It lists Lace and Eternl in `wallets`, the rest of Cardano wallets found in
  const { wallets } = useCardanoWallets({ allowlist: ['lace', 'eternl']
}
```

### Allowlist and restExperimental

Lists wallets allowed by `allowlist` in `wallets`, the rest of wallets found will be available in `experimentalWallets`.

```tsx
import { useCardanoWallets } from '@mvr-studio/use-dapp-connector'

const Component = () => {
  // It lists Lace and Eternl in `wallets`, the rest of Cardano wallets found in
  const { wallets, experimentalWallets } = useCardanoWallets({ allowlist: ['lace', 'eternl'],
  restExperimental: true
}
```

### useCardanoWallets Props

| Name              | Type         | Default | Description                                                                                                   |
| ----------------- | ------------ | ------- | ------------------------------------------------------------------------------------------------------------- |
| allowlist?        | WalletName[] |         | An optional list of allowed wallets to list in `wallets`.                                                     |
| restExperimental? | boolean      |         | Determines if the rest of wallets found in `window.cardano` should be listed in `experimentalWallets` or not. |

[Extended example](https://github.com/mvr-studio/use-dapp-connector/blob/main/test/e2e/App.tsx)
