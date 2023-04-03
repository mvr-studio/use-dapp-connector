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
    <div>
      <div className="container" style={{ maxWidth: '40rem', marginTop: '1rem' }}>
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
        <FeedbackSection label="getNetworkId" getValue={walletApi?.getNetworkId} isReady={isReady} />
        <FeedbackSection label="getUtxos" getValue={walletApi?.getUtxos} isReady={isReady} />
        <FeedbackSection label="getCollateral" getValue={walletApi?.getCollateral} isReady={isReady} />
        <FeedbackSection label="getBalance" getValue={walletApi?.getBalance} isReady={isReady} />
        <FeedbackSection label="getUsedAddresses" getValue={walletApi?.getUsedAddresses} isReady={isReady} />
        <FeedbackSection label="getUnusedAddresses" getValue={walletApi?.getUnusedAddresses} isReady={isReady} />
        <FeedbackSection label="getChangeAddress" getValue={walletApi?.getChangeAddress} isReady={isReady} />
        <FeedbackSection label="getRewardAddresses" getValue={walletApi?.getRewardAddresses} isReady={isReady} />
      </div>
      <footer className="footer" style={{ marginTop: '4rem' }}>
        <div className="content has-text-centered">
          <p>Made with 💙 by MVR Studio</p>
        </div>
      </footer>
    </div>
  )
}

export default App
