import React from 'react'

export default function CurrencyRowCoin(props) {
  const {
    coinCode,
    onChangeCoinCode
  } = props
  return (
    <div>
      COIN CODE : <input type="text" className="input" value={coinCode} onChange={onChangeCoinCode} />
    </div>
  )
}