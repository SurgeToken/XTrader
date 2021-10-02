import Token from "./Token";
import uselessABI from './abi/useless.json'

export default function ({address, abi}) {
    return class UselessToken extends Token({address, abi: uselessABI}) {

        // async getAddressOfUnderLyingAsset() {
        //     return this.methods._token().call();
        // }
        //
        // async getAddressOfContract() {
        //     return address || this.contract.address
        // }

        async calculatePrice() {
            return this.methods.calculatePrice().call();
        }

        // async getFees() {
        //     return this.methods.getFees().call();
        // }
        //
        // async getTokenQuantityInContract() {
        //     return this.methods.getTokenQuantityInContract().call();
        // }
        //
        // async getValueOfHoldings(address) {
        //     return this.methods.getValueOfHoldings(address || this.contract.options.from).call();
        // }
        //
        // async liquifyTheMistakesOfOthers(address) {
        //     return this.methods.liquifyTheMistakesOfOthers(address).send();
        // }
        //
        // async sell(amount) {
        //     return this.methods.sell(amount).send();
        // }
    }
}
