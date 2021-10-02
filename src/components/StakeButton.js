import {
    Button,
    Layer,
    Box, Text, Anchor
} from "grommet";
import React, {useContext, useEffect, useState} from "react";
import FormFieldError from "./FormFieldError/FormFieldError";
import contracts from "../contracts/contracts";
import state from "../state/state"
import {useRecoilState} from "recoil";
import {WalletContext} from '../context/context';
import Web3 from "web3";
import {StatusGood, StatusCritical, FormClose} from "grommet-icons";
import {bigIntStringFromBN} from "walletlink/dist/util";

function bscErrorMessage(status, transactionReceipt) {
    return (
        <Anchor color={"white"} href={`https://bscscan.com/tx/${transactionReceipt.transactionHash}`} target={"_blank"}
                label={`Transaction ${status ? "succeeded" : "failed"} click here for more details`}/>
    )
}
async function stake(wallet, asset, amount, setMessage, status, setStatus) {
    let currentAllowance;
    let transactionReceipt = {};
    let contractAddress = wallet.contracts["SUSLS"].contract._address;

    currentAllowance = await wallet.uselessContract.allowance(wallet.accountAddress, contractAddress);
    if (currentAllowance >= amount) {
        wallet.contracts["SUSLS"].stakeUnderlyingAsset(amount).then(
            (receipt) => {
                // console.error("receipt => ", receipt)
                transactionReceipt = receipt;
                setStatus(true);
            },
            (error) => {
                // console.error("error => ", error)
                // console.error("amount = ", amount)
                if (error.receipt) {
                    transactionReceipt = error.receipt;
                } else {
                    setMessage(<Text>{error.message}</Text>);
                }
                setStatus(false);
            }
        );
        if (transactionReceipt.transactionHash) {
            setMessage(bscErrorMessage(status, transactionReceipt));
        }
        // setStatus(status);
        // status = wallet.uselessContract.methods.stakeUnderlyingAsset(amount).then((receipt) => {
        //     console.error(receipt)
        // })
        // console.error(status)
        // status = wallet.contracts[asset].methods.stakeUnderlyingAsset(amount).then((receipt) => {
        //     transactionReceipt = receipt;
        //     return true;
        // }).catch((error) => {
        //     if (error.receipt) {
        //         transactionReceipt = error.receipt;
        //     } else {
        //         setMessage(<Text>{error.message}</Text>);
        //     }
        // })

        if (transactionReceipt.transactionHash) {
            setMessage(bscErrorMessage(status, transactionReceipt));
        }
        setStatus(status);
    }
}

async function executeStake(wallet, asset, amount, setMessage, status, setStatus) {
    // console.log(Number.MAX_SAFE_INTEGER)
    // console.log(Number.MAX_VALUE)
    // console.error(amount * (10**9))
    // console.error(BigInt(amount * (10**9)))
    // console.error(amount * Math.pow(10,9))
    // console.error(BigInt(amount * Math.pow(10,9)))
    // console.error(amount * 1.0e9)
    // console.error(BigInt(amount * 1.0e9))
    //check allowance
    let currentAllowance;
    let transactionReceipt = {};
    let contractAddress = wallet.contracts["SUSLS"].contract._address;
    // console.log(wallet.contracts["SUSLS"].contract._address)
    // wallet.contracts["SUSLS"].getAddressOfContract().then((address) => {
    //     contractsAddress = address;
    // })

    currentAllowance = await wallet.uselessContract.allowance(wallet.accountAddress, contractAddress);
    // currentAllowance = wallet.uselessContract.allowance(wallet.accountAddress, contractAddress).then(allowance => {
    //     console.log(allowance)
    //     return allowance;
    // })
    if (currentAllowance < amount)
        wallet.uselessContract.approve(contractAddress, amount).then(
            (receipt) => {
                // console.error("receipt => ", receipt)
                transactionReceipt = receipt;
                setStatus(true);
                stake(wallet, asset, amount, setMessage, status, setStatus).then()
            },
            (error) => {
                // console.error("error => ", error)
                // console.error("amount = ", amount)
                if (error.receipt) {
                    transactionReceipt = error.receipt;
                } else {
                    setMessage(<Text>{error.message}</Text>);
                }
                setStatus(false);
            }
        );
    else if (currentAllowance >= amount){
        stake(wallet, asset, amount, setMessage, status, setStatus).then()
    }
    // console.error(wallet.uselessContract.methods)

}

export default ({asset, amount, ...props}) => {
    const context = useContext(WalletContext);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false);

    const doClick = () => {
        // if (!validAmount)
            executeStake(context.wallet, asset, amount, setMessage, status, setStatus).then()
    }

    return (
        <Box>
            <Button onClick={doClick} {...props}/>
            {message && (
                <Layer
                    position="bottom"

                    modal={false}
                    margin={{vertical: 'medium', horizontal: 'small'}}
                    onEsc={() => setMessage('')}
                    responsive={false}
                    plain
                >
                    <Box
                        align="center"
                        direction="row"
                        gap="small"
                        justify="between"
                        round="medium"
                        elevation="medium"
                        pad={{vertical: 'xsmall', horizontal: 'small'}}
                        background={status ? "status-ok" : "status-critical"}
                    >
                        <Box align="center" direction="row" gap="xsmall">
                            {status ? <StatusGood/> : <StatusCritical/>}
                            <Text>
                                {message}
                            </Text>
                        </Box>
                        <Button icon={<FormClose/>} onClick={() => setMessage('')} plain/>
                    </Box>
                </Layer>
            )}
        </Box>
    )
}
