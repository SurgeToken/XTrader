import Web3 from "web3";
import {provider} from "./walletConnect";

export async function getAccount() {
    if (!provider) {
        return;
    }
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    return accounts[0] || null
}

export function isConnected() {
    if (provider && provider.connected) return true;
    else return false;
}

export function numberToWei(num) {
    const web3 = new Web3(provider);
    return parseInt(web3.utils.toWei(String(num), "ether")).toString(16);
}

export function numberFromWei(wei) {
    const web3 = new Web3(provider);
    return web3.utils.fromWei(String(wei), "ether");
}

/**
 * @param {string} account the account of the wallet
 * @return Promise<string>
 * */
export async function getBNBBalance(account) {
    if (!provider) return null;
    const web3 = new Web3(provider);
    const balance = await web3.eth.getBalance(account);
    return numberFromWei(balance);
}

/**
 * @param {any} contract the surge contract to read the balance from
 * @param {string} account the account of the wallet
 * @return Promise<string>
 * */
export async function getSurgeBalance(contract, account) {
    if (!provider) return null;
    const web3 = new Web3(provider);
    const Contract = new web3.eth.Contract(contract.abi, contract.address);
    return Contract.methods.balanceOf(account).call();
}