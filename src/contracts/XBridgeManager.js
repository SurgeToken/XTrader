import {Contract} from "./Contract.js";
import xBridgeManagerABI from './abi/XBridgeManager.json'
import XBridge from './XBridge';

export default class XBridgeManager extends Contract(xBridgeManagerABI) {

    constructor(provider) {
        super("0x9aE62bf5bB99EfcFb4dCC7E8389Fa0BF68839263", provider);

    }

    /*
        Create an X bridge for the provided address
        If an xBridge exists it will revert
     */
    async createXBridge(address) {
        return this.methods.createXBridge(address).send().catch(this.getXBridgeAddress.bind(this, address));
    }

    async getXBridgeAddress(address) {
        return this.methods.getXBridgeAddress(address).call();
    }

    async getXBridge(address) {
        return new XBridge(await this.getXBridgeAddress(address));
    }

    async isXBridge(address) {
        return this.methods.isXBridge(address).call()
    }

}


