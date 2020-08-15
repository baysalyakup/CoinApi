
import React, { useState, useAsync } from 'react';

import { render } from 'react-dom'
import axios from 'axios';
import './App.css';
import CurrencyRow from './CurrencyRow'
import CurrencyRowCoin from './CurrencyRowCoin'

function App() {
    const [exchangeRate, setExchangeRate] = useState()
    const [amount, setAmount] = useState(0)
    const [coinCode, setCoinCode] = useState()
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    const [totalReact, setTotalReact] = useState()  
    //const handleClick = this.handleClick

    const [coinPrice, setCoinPrice] = useState()  
    const [coinName, setCoinName] = useState()  
    const [coinAmount, setCoinAmount] = useState()  
    localStorage.setItem('BTC', '0')
    let total, fromAmount
    if (amountInFromCurrency) {
      fromAmount = amount
      total = amount * totalReact
    } 

    function handleFromAmountChange(e) {
    setAmount(e.target.value)
    }
    function handleCoinChange(e) {
      setCoinName(e.target.value)
    }

    function handleClick() {
        const a = fetch(`https://rest.coinapi.io/v1/exchangerate/${coinName}/USD`,{headers: {'X-CoinAPI-Key':'F18F3157-72D1-4193-AB6D-63355287F73E'}})
           .then(res => res.json())
           .then(res => {
              setCoinPrice(res.rate)
            })
        var stor = parseFloat(localStorage.getItem('BTC')) !== '0' ? parseFloat(localStorage.getItem('BTC')) : parseFloat('0')
        var s = parseFloat(amount) * parseFloat(coinPrice)
        var store = stor+s
        localStorage.setItem('BTC',store.toString())
   
        setTotalReact(s.toString())
        alert(localStorage.getItem('BTC'))
      }

      function handleClickSell() {
        const a = fetch(`https://rest.coinapi.io/v1/exchangerate/${coinName}/USD`,{headers: {'X-CoinAPI-Key':'F18F3157-72D1-4193-AB6D-63355287F73E'}})
           .then(res => res.json())
           .then(res => {
             setCoinPrice(res.rate)
            })
        var stor = parseFloat(localStorage.getItem('BTC')) !== '0' ? parseFloat(localStorage.getItem('BTC')) : parseFloat('0') 
        var s = parseFloat(amount) * parseFloat(coinPrice)
        var store = stor-s
        localStorage.setItem('BTC',store.toString())
        
        alert(localStorage.getItem('BTC'))
        setTotalReact(s.toString())
      }
      
    return (
      <>
       <h1>COIN</h1>
       <CurrencyRowCoin
          onChangeCoinCode={handleCoinChange}
          //coinCode={fromAmount}
        />
       <CurrencyRow
          onChangeAmount={handleFromAmountChange}

        />
        <br></br>
        <button className="button" onClick={handleClick}>Buy Coin </button>  
        <button className="button" onClick={handleClickSell}>Sell Coin </button>
        <div><h2>Price: {coinPrice}</h2></div>
        <div><h2>TOTAL : {totalReact}</h2></div>   
        <div><h2>TOTAL : {localStorage.getItem('BTC')}</h2></div>  

      </>
    );
  }


export default App;