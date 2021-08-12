import React, {useEffect, useState} from "react";
import {Button} from "grommet";
import {connectWallet, disconnectWallet} from "../common/walletConnect";
import {getAccount} from "../common/wallet";

const WalletButton = () => {
    const [isConnected, setConnected] = useState(false);
    const [account, setAccount] = useState("");

    const onConnectWallet = async () => {
        try {
            await connectWallet();
            const currentAccount = await getAccount();
            setAccount(currentAccount.slice(0, 4) + '...' + currentAccount.slice(38));
            setConnected(true)
        } catch (e) {
            console.log('Failed to connect wallet...', e)
            return;
        }
    }

    const onDisconnectWallet = async () => {
        try {
            await disconnectWallet();
            setConnected(false)
        } catch (e) {
            console.log('Failed to diconnect wallet', e)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await onConnectWallet()
            } catch (err) {
                console.log("Failed to connect wallet", err);
                return;
            }
        })();
    }, []);

    const buttonAction = async () => {
        if (isConnected) {
            await onDisconnectWallet()
        } else {
            await onConnectWallet()
        }
    }

    return (
        <Button
            size="medium"
            onClick={buttonAction}
            label={isConnected ? account : "Connect Wallet"}
        />
    )
}

export default WalletButton;