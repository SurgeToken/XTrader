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

//fix: for issue #122
const toHex = (amount) => {
    return '0x' + amount.toString(16)
};
const fromHex = (amount) => {
    return parseInt(amount);
};
const UINT256MAX = {HEX: Web3.utils.toBN(((2**256-1).toString(16))), DEC:parseInt(Web3.utils.toBN(((2**256-1).toString(16))), 16)};
function bscErrorMessage(status, transactionReceipt) {
    return (
        <Anchor color={"white"} href={`https://bscscan.com/tx/${transactionReceipt.transactionHash}`} target={"_blank"}
                label={`Transaction ${status ? "succeeded" : "failed"} click here for more details`}/>
    )
}
async function executeStake(wallet, asset, amount, setMessage, status, setStatus) {
    // let currentAllowance;
    let transactionReceipt = {};
    // let contractAddress = wallet.contracts["SUSLS"].contract._address;

    // currentAllowance = await wallet.uselessContract.allowance(wallet.accountAddress, contractAddress);
    // if (currentAllowance >= amount) {
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
    // }
}

async function approve(wallet, asset, amount, setMessage, status, setStatus) {
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
    //     console.log(currentAllowance)
    //     console.log(UINT256MAX.HEX)
    //     console.log(UINT256MAX.DEC)
    // console.log(parseInt(currentAllowance,16))
    // console.log(parseInt("00000000000000000001fcd28129b3bb800",16))
    // console.log(parseInt(currentAllowance,16) >= UINT256MAX.DEC)

        // console.log(Web3.utils.toBN(2**256-1))
        // console.log(amount)
        // console.log(fromHex(amount))
    // console.log(parseInt(Web3.utils.toBN(((2**256)-1).toString(16)), 16))
    // console.log(parseInt(Web3.utils.toBN(((2**256)).toString(16)), 16))
    // console.log(parseInt(Web3.utils.toBN(((2**256-1).toString(16))), 16))
        // console.log(fromHex("0x01e87f85809dc0000"))
    //     return allowance;
    // })
    if (parseInt(currentAllowance,16) < UINT256MAX.DEC)
        wallet.uselessContract.approve(contractAddress,UINT256MAX.HEX).then(
            (receipt) => {
                // console.error("receipt => ", receipt)
                transactionReceipt = receipt;
                setStatus(true);
                executeStake(wallet, asset, amount, setMessage, status, setStatus).then()
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
    else if (parseInt(currentAllowance,16) >= UINT256MAX.DEC){
        // console.error(wallet, asset, amount, status)
        executeStake(wallet, asset, amount, setMessage, status, setStatus).then()
    }
    // console.error(wallet.uselessContract.methods)

}
function stake(wallet, asset, amount, setMessage, status, setStatus){
    approve(wallet, asset, amount, setMessage, status, setStatus).then()
}
export default ({asset, amount, ...props}) => {
    const context = useContext(WalletContext);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false);

    const doClick = () => {
        // if (!validAmount)
            stake(context.wallet, asset, amount, setMessage, status, setStatus)
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
