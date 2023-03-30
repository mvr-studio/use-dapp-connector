import React from 'react'

interface WalletHeaderProps {
  walletName: string
  setWalletName: (name: string) => void
  enable: () => void
}

const WalletHeader = ({ walletName, setWalletName, enable }: WalletHeaderProps) => {
  return (
    <div>
      <div className="field">
        <label className="label" htmlFor="walletName">
          walletName
        </label>
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
      <div className="columns">
        <div className="column">
          <button className="button is-light is-small" onClick={() => setWalletName('lace')}>
            Lace
          </button>
        </div>
        <div className="column">
          <button className="button is-light is-small" onClick={() => setWalletName('yoroi')}>
            Yoroi
          </button>
        </div>
        <div className="column">
          <button className="button is-light is-small" onClick={() => setWalletName('nami')}>
            Nami
          </button>
        </div>
        <div className="column">
          <button className="button is-light is-small" onClick={() => setWalletName('eternl')}>
            Eternl
          </button>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-link is-light" onClick={enable}>
            Enable
          </button>
        </div>
      </div>
    </div>
  )
}

export default WalletHeader
