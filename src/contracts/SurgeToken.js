import Token from "./Token.js";
import surgeTokenABI from "./abi/SurgeToken.json"

export default function({address, abi}) {
    return class SurgeToken extends Token({address, abi: abi || surgeTokenABI}) {
        async calculatePrice() {
            return this.methods.calculatePrice().call();
        }

        async getBNBQuantityInContract() {
            return this.methods.getBNBQuantityInContract().call();
        }

        async getValueOfHoldings(addressOfHolder) {
            return this.methods.getValueOfHoldings(addressOfHolder || this.contract.options.from).call();
        }

        async sell(amount) {
            return this.methods.sell(amount).send();
        }

        async setSellingFee(fee) {
            return this.methods.setSellingFee(fee).send();
        }

        async setSpreadDivisor(divisor) {
            return this.methods.setSpreadDivisor(divisor).send();
        }

        async setTransferFee(fee) {
            return this.methods.setTransferFee(fee).send();
        }

    }
}


