import './App.css';
import NavBar from './NavBar'
import FarmCard from './FarmCard'
import Faucet from './Faucet'
import Footer from './Footer';
import { useWeb3React } from '@web3-react/core'


function App() {
  const {account, chainId} = useWeb3React()
  return (
    <div>
      <div>
        <NavBar address={"0xf4c294402c02cdc2e0668dd38f6750ebed72f4f1"}/>
        <FarmCard pairName={"BabyScream/Scream"} address={"0x40fb2353AbDF2A923351997f0411C1681dDEA1f0"} pid={0}/>
        <FarmCard pairName={"Woo/FTM"} address={"0x40fb2353AbDF2A923351997f0411C1681dDEA1f0"} pid={1}/>
        {account&&chainId==4002?<Faucet address={"0x241a71dc9e73dbfc7ceddaddd3017adfb299fdfe"}/>:""}
        <Footer />
      </div>
    </div>
  )
}

export default App