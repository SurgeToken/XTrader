import Token from "./Token.js";
import surgeTokenABI from "./abi/SurgeBUSD.json"

export default function({address, abi}) {
    return class SurgeToken extends Token({address, abi: abi || surgeTokenABI}) {

        // async getAddressOfUnderLyingAsset() {
        //     return this.methods._busd().call();
        // }

        async getAddressOfContract() {
            return address || this.contract.address
        }

        async calculatePrice() {
            return this.methods.calculatePrice().call();
        }


        async getBNBQuantityInContract() {
            return this.methods.getBNBQuantityInContract().call();
        }

        async getValueOfHoldings() {
            return this.methods.getValueOfHoldings(this.contract.options.from).call();
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


