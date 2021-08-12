import logo from './logo.svg';
import './App.css';
import { useEthers, useEtherBalance } from '@usedapp/core'
import NavBar from './NavBar'
import FarmCard from './FarmCard'
import Faucet from './Faucet'
import { useEffect, useState } from 'react';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'


function App() {
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React()
  return (
    <div>
      <div>
        <NavBar address={"0x2AbD25A6f7A6704b24BCe0d534FBcBdE176E8006"}/>
        <FarmCard address={"0x1508902bE163701383089951dB1b11fe5fc9022D"} pid={0}/>
        {account?<Faucet address={"0x241a71dc9e73dbfc7ceddaddd3017adfb299fdfe"}/>:""}
      </div>
    </div>
  )
}

export default App