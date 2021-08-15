import {Contract} from "./Contract.js";
import xBridgeManagerABI from './abi/XBridgeManager.json'
import XBridge from './XBridge';


export default ({address}) => {
    return class XBridgeManager extends Contract({address, abi: xBridgeManagerABI}) {

        constructor(provider, sender) {
            super(provider, sender);
        }

        /*
            Create an X bridge for the provided address
            If an xBridge exists it will revert
         */
        async createXBridge(address) {
            return this.methods.createXBridge(address).send().catch((err) => this.getXBridgeAddress(address));
        }

        async getXBridgeAddress(address) {
            return this.methods.getXBridgeAddress(address).call();
        }

        async isXBridge(address) {
            return this.methods.isXBridge(address).call()
        }

    }

}


