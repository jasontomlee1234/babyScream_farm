import abi from "./abi/masterchef.json"
import { Contract } from '@ethersproject/contracts'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import styled from "styled-components";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from '@ethersproject/units'
import tokenAbi from './abi/maercs.json'

const StyledCard = styled.div`
border-radius: 10px;
height: 300px;
border-color: cyan;
border-width: medium;
width: 300px;
border-style: solid;
color: cyan;
margin:auto;
padding: 30px
`

const StyledButton = styled.button``


function getContract(address, abi, library) {
    return new Contract(address, abi, library)
}

function getUserInfo(contract, user) {
    return contract.userInfo(0, user).then(rst => {
        return rst
    }).catch(e => console.log)
}

function getPoolInfo(contract, pid) {
    return contract.poolInfo(pid).then(rst => {
        return rst
    }).catch(e => console.log)
}

function getPendingReward(contract, user) {
    return contract.pendingmaercs(0, user).then(rst => {
        return rst
    }).catch(e => console.log)
}

function getBalance(contract, user) {
    return contract.balanceOf(user).then(rst => {
        console.log("fffff", rst)
        return rst
    }).catch(e => console.log)
}


function withdraw(contract, pid, amount) {
    contract.withdraw(pid.toString(), parseEther(amount))
}

function deposit(contract, pid, amount) {
    contract.deposit(pid.toString(), parseEther(amount))
}


function FarmCard(props) {
    const { library, account } = useWeb3React()
    const [staked, setStaked] = useState()
    const [pendingReward, SetPendingReward] = useState()
    const [contract, setContract] = useState()
    const [lpContract, setLpContract] = useState()
    const [lpBalance, setLpBalance] = useState(0)
    const [depositAmount, setDepositAmount] = useState(0)
    const [withdrawAmount, setWithdrawAmount] = useState(0)

    function handleDepositChange(event) {
        setDepositAmount(event.target.value)
    }

    function handleWithdrawChange(event) {
        setWithdrawAmount(event.target.value)
    }

    useEffect(() => {
        const contract = getContract(props.address, abi, library ? library.getSigner(account).connectUnchecked() : library)
        setContract(contract)
        getPendingReward(contract, account).then(rst => {
            SetPendingReward(rst)
        })
        getUserInfo(contract, account).then(rst => {
            setStaked(rst['amount'])
        })
        getPoolInfo(contract, props.pid).then(rst => {
            if (rst.length > 0) {
                console.log("rst:", rst)
                const lp = getContract(rst.lpToken, tokenAbi, library ? library.getSigner(account).connectUnchecked() : library)
                setLpContract(lp)
                getBalance(lp, account).then(balance => {
                    setLpBalance(balance)
                })

            }
        })
    }, [account])


    return (
        <StyledCard>
            <div>babyScream/Scream</div>
            <div>deposit: {staked ? formatEther(staked.toString()) : 0}</div>
            <div>earned: {pendingReward ? formatEther(pendingReward.toString()) : 0}</div>
            <div>
                <StyledButton onClick={() => {
                    withdraw(contract, props.pid, '0')
                }} disabled={account ? false : true}>harvest</StyledButton>
            </div>
            <div>
                <div>Deposit: </div>
                <div>balance: {account ? formatEther(lpBalance.toString()) : 0}</div>
                <input disabled={account ? false : true} type="number" value={depositAmount} onChange={handleDepositChange}></input>
                <StyledButton onClick={() => {
                    deposit(contract, props.pid, depositAmount)
                }} disabled={account ? false : true}>Deposit</StyledButton>
            </div>
            <div>
                <div>Withdraw: </div>
                <input disabled={account ? false : true} type="number" value={withdrawAmount} onChange={handleWithdrawChange}></input>
                <StyledButton onClick={() => {
                    withdraw(contract, props.pid, withdrawAmount)
                }} disabled={account ? false : true}>Withdraw</StyledButton>
            </div>
        </StyledCard>
    )
}

export default FarmCard