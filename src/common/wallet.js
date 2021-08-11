import Web3 from "web3";
import {provider} from "./walletConnect";

export async function getAccount() {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    return accounts[0] || null;
}

/**
 * Changed in an if statement becaue
 * "return provider && provider.connected"
 * return undefined if wallet is not connected
 */
export function isConnected() {
    if (provider && provider.connected) {
        return true;
    } else {
        return false;
    }
}

export function numberToWei(num) {
    const web3 = new Web3(provider);
    return parseInt(web3.utils.toWei(String(num), "ether"));
}