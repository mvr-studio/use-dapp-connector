import React from 'react'

type MetaEntry = {
  label: string
  value: React.ReactNode
}

interface WalletMetaProps {
  entries: MetaEntry[]
}

const WalletMeta = ({ entries }: WalletMetaProps) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <h2 className="title is-5">Wallet Meta</h2>
      {entries.map(({ label, value }) => (
        <div key={label} className="columns" style={{ alignItems: 'center' }}>
          <div className="column is-half has-text-weight-bold">{label}</div>
          <div className="column is-half">{value || '-'}</div>
        </div>
      ))}
    </div>
  )
}

export default WalletMeta
