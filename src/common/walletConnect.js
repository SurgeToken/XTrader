import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {WalletLink} from "walletlink";
import coinbaseLogo from '../images/coinbase.svg';

const providerOptions = {
    walletConnectMainNet: {
        appName: 'xSurge',
        network: "binance",
        rpc: {
            56: "https://bsc-dataseed1.binance.org/"
        },
        chainId: 56
    },
    walletConnectTestNet: {
        appName: 'xSurge',
        network: "binance",
        rpc: {
            56: "https://data-seed-prebsc-1-s1.binance.org:8545/"
        },
        chainId: 56
    }
};

export let provider;

export async function connectWallet() {
    try {
        const web3Modal = new Web3Modal({
            network: "binance",
            cacheProvider: true,
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: providerOptions.walletConnectMainNet

                },
                'custom-coinbase': {
                    display: {
                        logo: coinbaseLogo,
                        name: 'Coinbase',
                        description: 'Scan with WalletLink to connect',
                    },
                    options: providerOptions.walletConnectMainNet,
                    package: WalletLink,
                    connector: async () => {
                        const walletLink = new WalletLink({
                            appName: providerOptions.walletConnectMainNet.appName
                        });
                        const provider = walletLink.makeWeb3Provider(providerOptions.walletConnectMainNet.rpc["56"], 56);
                        await provider.enable();
                        return provider;
                    },
                }
            },

        });
        provider = await web3Modal.connect()
    } catch (err) {
        if (err === undefined) {
            alert('If you are having trouble connecting to MetaMask, please check if you still have a pending connection request') //TODO still checking web3Modal library to catch MetamskError better
        }
        if (provider) {
            await provider.close();
        }
        throw err;
    }
}

export async function disconnectWallet() {
    if (provider) {
        if (!provider.connected) {
            return;
        }

        try {
            await provider.disconnect();
        } catch (err) {
            console.log("Failed to disconnect wallet", err);
        }

        await provider.close()
    }
}
