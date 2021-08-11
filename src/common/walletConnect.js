import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

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
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: providerOptions.walletConnectMainNet
                }
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

export async function getAccount() {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    return accounts[0] || null;
}

export function isConnected() {
    return provider && provider.connected;
}

export function numberToWei(num) {
    const web3 = new Web3(provider);
    return parseInt(web3.utils.toWei(String(num), "ether"));
}