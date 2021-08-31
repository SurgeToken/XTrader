import {Contract} from "./Contract.js";
import abi from './abi/SurgeFunds.json'

export default ({address}) => {
    return class SurgeFundsContract extends Contract({address, abi: abi}) {

        constructor(provider, sender) {
            super(provider, sender);
        }

        async claim() {
            return this.methods.claim(this.contract.options.from).send();
        }


        async usersCurrentClaim() {
            return this.methods.usersCurrentClaim(this.contract.options.from).call();
        }


        async secondsUntilNextClaim() {
            return this.methods.secondsUntilNextClaim(this.contract.options.from).call();
        }


        async bnbRemainingToClaimForVictim() {
            return this.methods.bnbRemainingToClaimForVictim().call();
        }


        async totalShares() {
            return this.methods.totalShares().call();
        }


        async totalBNBDistributed() {
            return this.methods.totalBNBDistributed().send();
        }



    }
}
