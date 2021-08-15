import {
    Box,
    Button,
    TextInput,
    ResponsiveContext,
    Card,
    CardBody,
    Anchor,
    CardHeader,
    Text,
    RangeInput
} from "grommet";
import React, {useContext, useEffect, useState} from "react";
import FormFieldError from "./FormFieldError/FormFieldError";
import {BridgeCreator, Bridge} from "../contracts/contracts";
import wallet from "./Wallet"
import {useRecoilState} from "recoil";


async function executeTransaction(wallet, asset, amount) {
    // create an xBridgeManager connection
    const bridgeCreator = new BridgeCreator(wallet.provider);
    const bridge = new (Bridge(await bridgeCreator.createXBridge(wallet.accountAddress)))(wallet.provider);


}

export default ({asset, amount, ...props}) => {
    const [userWallet, setUserWallet] = useRecoilState(wallet.object);
    const doClick = () => {
        executeTransaction(userWallet, asset, amount).then(
            () => {

            }
        )
    }
    return (
        <Button onClick={doClick} {...props}/>
    )
}
