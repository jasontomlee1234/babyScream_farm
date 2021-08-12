
import styled from "styled-components";
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import abi from './abi/maercs.json'
import { Contract } from '@ethersproject/contracts'
import { formatEther, parseEther } from '@ethersproject/units'
import { useEffect, useState } from "react";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 4002] })
const StyledDiv = styled.div`
background: black;
border-radius: 10px;
height: 50px;
border-color: cyan;
border-width: medium;
padding: 10px;
margin: 10px;
border-style: solid;
`

const StyledButton = styled.button`
background: black;
float: right;
color: cyan;
border: cyan;
border-radius: 100px;
border-width: medium;
border-color: cyan;
width: 100px;
border-style: solid;
height: 50px;
`

const StyledTitle = styled.div`
float: left;
font-size: 40px;
color: cyan;
`

const StyledBalance = styled.div`
float: left;
font-size: 20px;
color: cyan;
`

function getTokenContract(address, abi, library) {
    return new Contract(address, abi, library)
}

function getBalance(contract, user) {
    return contract.balanceOf(user).then(rst => {
        return rst
    }).catch(e => console.log)
}

function NavBar(props) {
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React()

    const [maercsBalance, setMaercsBalance] = useState(0)

    useEffect(() => {
        const contract = getTokenContract(props.address, abi, library ? library.getSigner(account).connectUnchecked() : library)
        getBalance(contract, account).then(rst => {
            setMaercsBalance(rst)
        })
    }, [account])

    return (
        <StyledDiv>
            <StyledTitle>BabyScream</StyledTitle>
            {maercsBalance ? <StyledBalance>
                {"maercs balance: "+formatEther(maercsBalance.toString())}
            </StyledBalance> : ""}
            <StyledButton onClick={() => { account ? deactivate() : activate(injected) }}>{
                account ? account.slice(0, 6) + "..." : "Connect"
            }</StyledButton>
        </StyledDiv>
    )
}

export default NavBar