import {Contract} from "./Contract";


/*
    This is a generic token wrapper class. It's main purpose is to remove the abi argument to the
    web3.eth.Contract constructor. The choice of using an EventEmitter was to allow these to be used
    server side on node.js.
 */
export const Token = (abiJSON) => {
    return class GenericToken extends Contract(abiJSON) {
        constructor(addressOfContract, provider) {
            super(addressOfContract, provider);
        }

        async totalSupply() {
            return this.methods.totalSupply().call();
        }

        async decimals(){
            return this.methods.decimals().call();
        }

        async balanceOf() {
            return this.methods.balanceOf().call();
        }

        /* approves */
        async approve(amount) {
            return this.methods.approve().send(amount);
        }
        async transfer(amount, addressOfReceiver) {
            return this.method.transfer().send(amount);
        }
    }

}
