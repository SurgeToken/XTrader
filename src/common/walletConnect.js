import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

const providerOptions = {
    walletConnectMainNet: {
        rpc: {
            56: "https://bsc-dataseed1.binance.org/"
        },
        chainId: 56
    },
    walletConnectTetsNet: {
        rpc: {
            56: "https://data-seed-prebsc-1-s1.binance.org:8545/"
        },
        chainId: 56
    }
};

export const provider = new WalletConnectProvider(providerOptions.walletConnectMainNet);
const web3 = new Web3(provider)


export function connectWallet() {
    provider.enable()
        .catch(
            e => {
                console.log(e)
                provider.close()
            }
        );
}

export async function disconnectWallet() {
    if (provider.connected) {
        provider.disconnect()
            .catch(e => {
            });
        await provider.close()
    }
}

export function getAccount() {
    const accounts = provider.getAccounts()
    return accounts[0] || null
}

export function isConnected() {
    return provider.connected;
}

export function numberToWei(num) {
    return parseInt(web3.utils.toWei(String(num), "ether")).toString(16)
}