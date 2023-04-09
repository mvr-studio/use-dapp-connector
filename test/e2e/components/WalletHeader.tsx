import React from 'react'
import { ListableWallet } from '../../../src/useCardanoWallets'

interface WalletHeaderProps {
  walletName: string
  setWalletName: (name: string) => void
  enable: () => void
  wallets: ListableWallet[]
}

const WalletHeader = ({ walletName, setWalletName, enable, wallets }: WalletHeaderProps) => {
  return (
    <div>
      <label className="label" htmlFor="walletName">
        walletName
      </label>
      <div className="columns">
        <div className="column">
          <div className="control">
            <input
              id="walletName"
              className="input"
              type="text"
              placeholder="Wallet Name"
              value={walletName}
              onChange={(event) => setWalletName(event.target.value)}
            />
          </div>
        </div>
        <div className="column is-narrow">
          <div className="control">
            <button className="button is-link is-light" onClick={enable}>
              Enable
            </button>
          </div>
        </div>
      </div>
      <div className="columns">
        {wallets?.map((wallet) => (
          <div key={wallet.walletName} className="column is-narrow">
            <button className="button is-light is-small" onClick={() => setWalletName(wallet.walletName)}>
              <img src={wallet.icon} style={{ width: '1rem', marginRight: '0.5rem' }} />
              {wallet.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WalletHeader
