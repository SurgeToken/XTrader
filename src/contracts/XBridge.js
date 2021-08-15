import {Contract} from "./Contract.js";
import xBridgeABI from './abi/XBridge.json'

export default ({address}) => {
    return class XBridge extends Contract({address, abi: xBridgeABI}) {

        constructor(provider, sender) {
            super(provider, sender);
        }

        async buyXTokenWithNative(addressOfNative, addressOfXToken) {
            return this.methods.buyXTokenWithNative(addressOfNative, addressOfXToken).send();
        }

        async sellXTokenForNative(addressOfXToken, amount) {
            return this.methods.sellXTokenForNative(addressOfXToken, amount).send();
        }

        async getBridgeName() {
            return this.methods.getBridgeName().call();
        }

        async setBridgeName(name) {
            return this.methods.setBridgeName(name).send();
        }
        /*
            set the token this bridge will purchase if BNB is sent to the bridge
         */
        async setReceivingNativeToken(addressOfNative) {
            return this.methods.setReceivingSurgeToken(addressOfNative).send();
        }



    }
}
