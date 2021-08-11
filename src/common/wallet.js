import Web3 from "web3";
import {provider} from "./walletConnect";

export async function getAccount() {
    if (!provider || !provider.connected) {
        return;
    }
    console.log('testing', provider)
    const accounts = await provider.getAccounts();
    return accounts[0] || null
}

export function isConnected() {
    if( provider && provider.connected)
        return true
    else return false;
}

export function numberToWei(num) {
    const web3 = new Web3(provider);
    return parseInt(web3.utils.toWei(String(num), "ether")).toString(16);
}