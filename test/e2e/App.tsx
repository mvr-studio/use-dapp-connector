import React, { useEffect, useState } from 'react'
import { useCardanoWallets, useDappConnector } from '../../src'
import { WalletMeta, WalletHeader, FeedbackSection } from './components'

const App = () => {
  const [walletName, setWalletName] = useState<string>('')
  const { wallets } = useCardanoWallets()
  const { enable, isEnabled, isEnabling, isReady, apiVersion, name, icon, walletApi, error } = useDappConnector({
    walletName
  })

  useEffect(() => {
    if (!wallets || wallets?.length < 1) return
    setWalletName(wallets?.[0].walletName)
  }, [wallets])

  return (
    <div className="container" style={{ maxWidth: '40rem', marginTop: '1rem', marginBottom: '6rem' }}>
      <h1 className="title is-4">DApp Connector</h1>
      <WalletHeader walletName={walletName} setWalletName={setWalletName} enable={enable} />
      <hr />
      <WalletMeta
        entries={[
          { label: 'isEnabled (Authorized in the wallet)', value: String(isEnabled) },
          { label: 'isEnabling', value: String(isEnabling) },
          { label: 'isReady (WalletAPI ready to be used)', value: String(isReady) },
          { label: 'error', value: error?.message },
          { label: 'name', value: name },
          { label: 'icon', value: <img src={icon} style={{ width: '2rem' }} /> },
          { label: 'apiVersion', value: apiVersion }
        ]}
      />
      <hr />
      <h2 className="title is-5">Wallet API</h2>
      <FeedbackSection label="getNetworkId" getValue={walletApi?.getNetworkId} />
      <FeedbackSection label="getUtxos" getValue={walletApi?.getUtxos} />
      <FeedbackSection label="getCollateral" getValue={walletApi?.getCollateral} />
      <FeedbackSection label="getBalance" getValue={walletApi?.getBalance} />
      <FeedbackSection label="getUsedAddresses" getValue={walletApi?.getUsedAddresses} />
      <FeedbackSection label="getUnusedAddresses" getValue={walletApi?.getUnusedAddresses} />
      <FeedbackSection label="getChangeAddress" getValue={walletApi?.getChangeAddress} />
      <FeedbackSection label="getRewardAddresses" getValue={walletApi?.getRewardAddresses} />
    </div>
  )
}

export default App
