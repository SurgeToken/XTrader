import {Contract} from "./Contract";
import exemptTokenABI from "./abi/ExemptToken.json";

class ExemptToken extends Contract(exemptTokenABI) {
    constructor(address) {
        super(address);
    }

    async getNativeAddress() {
        return this.methods.getNativeAddress().call();
    }

    async getNativeTokenInContract() {
        return this.methods.getNativeTokenInContract().call();
    }
}
