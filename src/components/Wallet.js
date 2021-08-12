import React, {useEffect, useState} from "react";
import {Button} from "grommet";
import {connectWallet} from "../common/walletConnect";
import {getAccount} from "../common/wallet";

const WalletButton = (props) => {
    const [isConnected, setConnected] = useState(false);
    const [account, setAccount] = useState("");
    const [size] = useState(props.size);

    const walletConnect = async () => {
        try {
            await connectWallet();
            setConnected(true)
            const currentAccount = await getAccount();
            switch (size) {
                case 'small':
                    setAccount(currentAccount.slice(0, 3) + '...' + currentAccount.slice(39));
                    break;
                case 'medium':
                    setAccount(currentAccount.slice(0, 4) + '...' + currentAccount.slice(38));
                    break;
                default:
                    setAccount(currentAccount.slice(0, 5) + '...' + currentAccount.slice(37));
                    break;
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
            } catch (err) {
                console.log("Failed to connect wallet", err);
                return;
            }
        })();
    });

    return (
        <Button
            size="medium"
            onClick={walletConnect}
            label={isConnected ? account : "Connect Wallet"}
        />
    )
}

export default WalletButton;