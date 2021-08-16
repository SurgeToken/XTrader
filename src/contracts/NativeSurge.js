import Token from "./Token";
import nativeSurgeABI from './abi/NativeSurge_metadata.json'

export default function ({address, abi}) {
    return class NativeSurge extends Token({address, abi: nativeSurgeABI}) {

        async calculatePrice() {
            return this.methods.calculatePrice().call();
        }

        async getFees() {
            return this.methods.getFees().call();
        }

        async getTokenQuantityInContract() {
            return this.methods.getTokenQuantityInContract().call();
        }

        async getValueOfHoldings(addressOfHolder) {
            return this.methods.getValueOfHoldings(addressOfHolder || this.contract.options.from).call();
        }

        async liquifyTheMistakesOfOthers(address) {
            return this.methods.liquifyTheMistakesOfOthers(address).send();
        }

    }
}
