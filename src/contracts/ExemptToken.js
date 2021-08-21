import Token from "./Token";
import exemptTokenABI from "./abi/ExemptToken.json";


export default function({address, abi}) {
    return class ExemptToken extends Token({address, abi: abi || exemptTokenABI}) {

        constructor(provider, addressOfSender) {
            super(provider, addressOfSender);
        }

        async getNativeAddress() {
            return this.methods.getNativeAddress().call();
        }

        async getNativeTokenInContract() {
            return this.methods.getNativeTokenInContract().call();
        }
    }
}


