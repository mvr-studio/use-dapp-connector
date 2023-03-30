import React, { useState } from 'react'
import { useDappConnector } from '../../src'
import { WalletMeta, WalletHeader, FeedbackSection } from './components'

const App = () => {
  const [walletName, setWalletName] = useState<string>('lace')
  const { enable, isEnabled, apiVersion, name, icon, api } = useDappConnector({ walletName })

  return (
    <div className="container" style={{ maxWidth: '40rem', marginTop: '1rem', marginBottom: '6rem' }}>
      <h1 className="title is-4">DApp Connector</h1>
      <WalletHeader walletName={walletName} setWalletName={setWalletName} enable={enable} />
      <hr />
      <WalletMeta
        entries={[
          { label: 'isEnabled', value: String(isEnabled) },
          { label: 'name', value: name },
          { label: 'icon', value: <img src={icon} style={{ width: '2rem' }} /> },
          { label: 'apiVersion', value: apiVersion }
        ]}
      />
      <hr />
      <h2 className="title is-5">Wallet API</h2>
      <FeedbackSection label="getNetworkId" getValue={api?.getNetworkId} />
      <FeedbackSection label="getUtxos" getValue={api?.getUtxos} />
      <FeedbackSection label="getCollateral" getValue={api?.getCollateral} />
      <FeedbackSection label="getBalance" getValue={api?.getBalance} />
      <FeedbackSection label="getUsedAddresses" getValue={api?.getUsedAddresses} />
      <FeedbackSection label="getUnusedAddresses" getValue={api?.getUnusedAddresses} />
      <FeedbackSection label="getChangeAddress" getValue={api?.getChangeAddress} />
      <FeedbackSection label="getRewardAddresses" getValue={api?.getRewardAddresses} />
    </div>
  )
}

export default App
