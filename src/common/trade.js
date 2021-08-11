import Web3 from "web3";
import { getAccount, numberToWei, provider } from "./walletConnect";

/**
 * Buy surge tokens
 * @param {Contract} contract The contract of the surge token to buy
 * @param {number} amount The amount of the input token to buy surge tokens for
 */
export async function buy(contract, amount) {
    const web3 = new Web3(provider);

    const tx = {
        nonce: '0x00',
        to: contract.address,
        from: await getAccount(),
        value: numberToWei(amount)
    };

    return web3.eth.sendTransaction(tx);
}

/**
 * Sell surge tokens
 * @param {Contract} contract The contract of the surge token to sell
 * @param {number} amount The amount of surge tokens to sell
 */
export async function sell(contract, amount) {
    const web3 = new Web3(provider);
}