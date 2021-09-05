import Token from "./Token";
import nativeSurgeABI from './abi/NativeSurge_metadata.json'

export default function ({address, abi}) {
    return class NativeSurge extends Token({address, abi: nativeSurgeABI}) {

        async getAddressOfContract() {
            return address || this.contract.address
        }

        async calculatePrice() {
            return this.methods.calculatePrice().call();
        }

        async getFees() {
            return this.methods.getFees().call();
        }

        async getTokenQuantityInContract() {
            return this.methods.getTokenQuantityInContract().call();
        }

        async getValueOfHoldings(address) {
            return this.methods.getValueOfHoldings(address || this.contract.options.from).call();
        }

        async liquifyTheMistakesOfOthers(address) {
            return this.methods.liquifyTheMistakesOfOthers(address).send();
        }

        async sell(amount) {
            return this.methods.sell(amount).send();
        }
    }
}
