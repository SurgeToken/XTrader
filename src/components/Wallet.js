import React, {useEffect, useState} from "react";
import {Button} from "grommet";
import {connectWallet} from "../common/walletConnect";
import {getAccount, isConnected} from "../common/wallet";

function isWalletConnected () {
    return isConnected();
}

const WalletButton = (props) => {
    const [isConnected, setConnected] = useState(false);
    const [account, setAccount] = useState("");
    const [size, setSize] = useState(props.size);

    const walletConnect = async () => {
        try {
            await connectWallet();
            setConnected(true)
            const currentAccount = await getAccount();
            switch (size) {
                case 'small':setAccount(currentAccount.slice(0, 3) + '...' + currentAccount.slice(39));
                case 'medium':setAccount(currentAccount.slice(0, 4) + '...' + currentAccount.slice(38));
                default: setAccount(currentAccount.slice(0, 5) + '...' + currentAccount.slice(37));
            }
        } catch (e) {
            console.log('Failed to connect wallet...', e)
            return;
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await walletConnect()
                console.log(size)
            } catch (err) {
                console.log("Failed to connect wallet", err);
                return;
            }
        })();
    }, []);

    return (
        <Button
            size="medium"
            onClick={walletConnect}
            label={isConnected ? account : "Connect Wallet"}
        />
    )
}

export default WalletButton;