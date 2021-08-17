import {
    Button,
    Layer,
    Box, Text, Anchor
} from "grommet";
import React, {useContext, useEffect, useState} from "react";
import FormFieldError from "./FormFieldError/FormFieldError";
import {BridgeCreator, Bridge} from "../contracts/contracts";
import state from "../state/state"
import {useRecoilState} from "recoil";
import {WalletContext} from '../context/context';
import Web3 from "web3";
import {StatusGood, StatusCritical, FormClose} from "grommet-icons";



async function executeXTransaction(wallet, asset, amount, setMessage, setStatus) {
    // create an xBridgeManager connection
    const bridgeCreator = new BridgeCreator(wallet.provider, wallet.accountAddress);
    const bridgeAddress = await bridgeCreator.createXBridge(wallet.accountAddress);
    const bridge = new (Bridge({address: bridgeAddress}))(wallet.provider, wallet.accountAddress);
    let nativeSurge;
    let transactionReceipt = {};
    if (asset === 'xSBNB') {
        nativeSurge = wallet.contracts['SURGE'];
    } else {
        nativeSurge = wallet.contracts[asset.slice(1).toUpperCase()];
    }
    const status = await bridge.buyXTokenWithNative(nativeSurge.address, wallet.contracts[asset].address).catch(async (error) => {
        if  (error.receipt) {
            console.log(`Failed to purchase X tokens most likely because bridge is missing them attempting to transfer ${amount} native`);

            // For now just assume they don't have any native surge in the bridge
            return await nativeSurge.transfer(bridgeAddress, amount).then(
                async (receipt) => {
                    console.log("transferred native surge to bridge");
                    return await bridge.buyXTokenWithNative(nativeSurge.address, wallet.contracts[asset].address).then(
                        (receipt) => {
                            console.log("bought x tokens");
                            transactionReceipt = receipt;
                            return true;
                        }
                    ).catch((error) => {
                        console.log("failed to buy x tokens after transfer");
                        transactionReceipt = error.receipt;

                        return false
                    })
                }
            ).catch((error) => {
                console.log("failed transfer native", error);
                if (error.receipt) {
                    transactionReceipt = error.receipt;
                    return false;
                }
            })
        } else {
            return false;
        }
    });
    setMessage(<Anchor color={"white"} href={`https://bscscan.com/tx/${transactionReceipt.transactionHash}`} target={"_blank"} label={`Transaction ${status ? "succeeded" : "failed"} click here for more details`}/>);
    setStatus(status);
}

async function executeNativeTransaction(wallet, asset, amount) {

}

export default ({asset, amount, ...props}) => {
    const context = useContext(WalletContext);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(false);
    const execute = asset[0] === 'x' ? executeXTransaction : executeNativeTransaction;
    const doClick = () => {
        execute(context.wallet, asset, amount, setMessage, setStatus).then(
            () => {

            }
        )
    }
    return (
        <Box>
            <Button onClick={doClick} {...props}/>
            {message && (
                <Layer
                    position="bottom"
                    modal={false}
                    margin={{ vertical: 'medium', horizontal: 'small' }}
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
                        pad={{ vertical: 'xsmall', horizontal: 'small' }}
                        background={status ? "status-ok" : "status-critical"}
                    >
                        <Box align="center" direction="row" gap="xsmall">
                            {status ? <StatusGood /> : <StatusCritical/>}
                            <Text>
                                {message}
                            </Text>
                        </Box>
                        <Button icon={<FormClose />} onClick={() => setMessage('')} plain />
                    </Box>
                </Layer>
            )}
        </Box>
    )
}
