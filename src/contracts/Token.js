import {web3} from "./Contract";


/*
    This is a generic token wrapper class. It's main purpose is to remove the abi argument to the
    web3.eth.Contract constructor. The choice of using an EventEmitter was to allow these to be used
    server side on node.js.
 */
export const Token = (abiJSON) => {
    return class GenericToken extends web3.eth.Contract {
        _totalSupply = 0;
        constructor(addressOfContract, addressOfSender) {
            super(abiJSON, addressOfContract);
            this.senderAddress = addressOfSender;
        }

        async totalSupply() {
            return this.methods.totalSupply().call();
        }

        async decimals(){
            return this.methods.decimals().call();
        }

        async balance() {
            return this.methods.balanceOf(this.senderAddress).call();
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
