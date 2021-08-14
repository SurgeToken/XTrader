import React, {useEffect, useState} from "react";
import { Button, ResponsiveContext } from "grommet";
import {connectWallet, disconnectWallet, provider} from "../common/walletConnect";
import {getAccount} from "../common/wallet";

const WalletButton = (props) => {
    const {wallet, onConnected} = props;
    const [isConnected, setConnected] = useState(false);
    const [account, setAccount] = useState("");
    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);


    const buttonAction = async () => {
        if (isConnected) {
            await wallet.disconnect();
            setConnected(false);
            onConnected(false);
        } else {
            await wallet.connect();
            const currentAccount = await wallet.account();
            setAccount(currentAccount.slice(0, 4) + '...' + currentAccount.slice(38));
            setConnected(true);
            onConnected(true);
        }
    }

    return (
        <Button
            size="medium"
            onClick={buttonAction}
            label={isConnected ? account : (size === "xsmall" ? "Wallet" : "Connect Wallet")}
        />
    )
}

export default WalletButton;
