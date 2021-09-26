import {Contract} from "./Contract";
import abi from './abi/PcsFactoryABI.json';
// const address =
/*
    This is a generic token wrapper class. It's main purpose is to remove the abi argument to the
    web3.eth.Contract constructor. The choice of using an EventEmitter was to allow these to be used
    server side on node.js.
 */
export default ({address}) => {
    return class factory extends Contract({address, abi: abi}) {
        async getPair(token0, token1) {
            return this.methods.getPair(token0, token1).call();
        }
    }
}