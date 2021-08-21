import {Contract} from "./Contract";
import erc20 from './abi/erc20.json';

/*
    This is a generic token wrapper class. It's main purpose is to remove the abi argument to the
    web3.eth.Contract constructor. The choice of using an EventEmitter was to allow these to be used
    server side on node.js.
 */
export default ({address, abi}) => {
    return class GenericToken extends Contract({address, abi: abi || erc20}) {

        /*
            - Events -
            Transfer(from, to, value)
            Approval(owner, spender, value)
         */

        /*
            constructs a Generic IERC20 Token with the given contact address and provider
         */
        constructor(provider, sender) {
            super(provider, sender);
        }

        async totalSupply() {
            return this.methods.totalSupply().call();
        }

        async balanceOf(address) {
            return this.methods.balanceOf(address || this.contract.options.from).call();
        }

        async balance() {
            return this.methods.balanceOf(this.contract.address).call();
        }

        async transferFrom(recipientAddress, amount) {
            return this.methods.transferFrom(this.contract.options.from, recipientAddress, amount).send();
        }

        async transfer(recipientAddress, amount) {
            return this.methods.transfer(recipientAddress, amount).send();
        }

        async name() {
            return this.method.name().call();
        }

        async decimals() {
            return this.methods.decimals().call();
        }

        async symbol() {
            return this.methods.symbol().call();
        }

    }

}
