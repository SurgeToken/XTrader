import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
    walletConnectMainNet: {
        network: "binance",
        rpc: {
            56: "https://bsc-dataseed1.binance.org/"
        },
        chainId: 56
    },
    walletConnectTestNet: {
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
                // 'custom-coinbase': { //TODO still working on it, leave it here
                //     display: {
                //         logo: coinbaseLogo,
                //         name: 'Coinbase',
                //         description: 'Scan with WalletLink to connect',
                //     },
                //     options: providerOptions.walletConnectMainNet,
                //     package: WalletLink,
                //     connector: async (_, options) => {
                //         const { appName, networkUrl, chainId } = options
                //         const walletLink = new WalletLink({
                //             appName: 'xSurge'
                //         });
                //         const provider = walletLink.makeWeb3Provider(providerOptions.walletConnectMainNet.rpc["56"], 56);
                //         await provider.enable();
                //         return provider;
                //     },
                // }
            }
        });
        provider = await web3Modal.connect();
    } catch (err) {
        console.log("Failed to connect wallet", err)
        await provider.close();
    }
}

export async function disconnectWallet() {
    if (provider.connected) {
        return;
    }

    try {
        await provider.disconnect();
    } catch (err) {
        console.log("Failed to disconnect wallet", err);
    }

    await provider.close()
}

