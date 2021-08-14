import {Token} from "./Token";
import exemptTokenABI from "./abi/ExemptToken.json";

class ExemptToken extends Token(exemptTokenABI) {

    async getNativeAddress() {
        return this.methods.getNativeAddress().call();
    }

    async getNativeTokenInContract() {
        return this.methods.getNativeTokenInContract().call();
    }
}
