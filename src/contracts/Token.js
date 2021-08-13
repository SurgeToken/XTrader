
import Web3 from "web3";

export const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

/*
    This is a generic token wrapper class. It's main purpose is to remove the abi argument to the
    web3.eth.Contract constructor. The choice of using an EventEmitter was to allow these to be used
    server side on node.js.
 */
export const Token = (abiJSON) => {
    return class GenericToken extends web3.eth.Contract {
        _totalSupply = 0;
        constructor(addressOfContract) {
            super(abiJSON, addressOfContract);
        }

        async totalSupply() {
            return this.methods.totalSupply.call();
        }

        async get decimals(){

            this._decimals = this.methods.decimals.call()
            return this._decimals;
        }

        get balance() {
            return this.methods.balanceOf();
        }

        /* approves */
        async approve(amount) {
            return this.methods.approve.send(amount);
        }
        async transfer(amount, addressOfReceiver) {
            return this.method.transfer.send(amount);
        }
    }

}
