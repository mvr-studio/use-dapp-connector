import React, { useState } from 'react'

interface FeedbackSectionProps {
  label: string
  getValue: (() => Promise<any>) | undefined
  isReady: boolean
}

const FeedbackSection = ({ label, getValue, isReady }: FeedbackSectionProps) => {
  const [value, setValue] = useState('-')

  const handleClick = async () => {
    setValue('-')
    if (!getValue) return
    const nextValue = await getValue()
    setValue(JSON.stringify(nextValue))
  }

  return (
    <div className="columns" style={{ alignItems: 'center' }}>
      <div className="column is-half">
        <button className="button is-link is-light" onClick={handleClick} disabled={!isReady}>
          {label}
        </button>
      </div>
      <div className="column is-half">
        <div
          className="box"
          style={{ overflowWrap: 'break-word', maxHeight: '20rem', overflowY: 'scroll', fontSize: '14px' }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

export default FeedbackSection
