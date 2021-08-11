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
    const web3 = new Web3(provider)
    const balance = await web3.eth.getBalance(account)
    return numberFromWei(balance)
}

/**
 * @param {string} account the account of the wallet
 * @param {string} surgeContract the account of the wallet
 * @param {json} abi the account of the wallet
 * @return Promise<string>
 * */
export async function getSurgeBalance(account, surgeContract, abi) {
    if (!provider) return ;
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract(abi, surgeContract)
    const balance = await contract.methods.balanceOf(account).call()
    return balance
}