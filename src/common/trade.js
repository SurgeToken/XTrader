import Web3 from "web3";
import { provider } from "./walletConnect";
import {getAccount, numberToWei} from "./wallet";

/**
 * Buy surge contracts
 * @param {Contract} contract The contract of the surge token to buy
 * @param {number} amount The amount of the input token to buy surge contracts for
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
 * Sell surge contracts
 * @param {Contract} contract The contract of the surge token to sell
 * @param {number} amount The amount of surge contracts to sell
 */
export async function sell(contract, amount) {
    if (isNaN(parseFloat(amount)) || Number(amount) <= 0) {
        throw Error("Invalid amount");
    }

    const web3 = new Web3(provider);
    const Contract = new web3.eth.Contract(contract.abi, contract.address);

    const fromAddress = await getAccount();

    if (!fromAddress) {
        throw new Error("No from address found");
    }

    const sanitizedAmount = Number(amount);

    return Contract.methods.sell(sanitizedAmount).send({
        from: fromAddress
    });
}
