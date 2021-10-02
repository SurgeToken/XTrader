import Token from "./Token";
import surgeUselessABI from './abi/surgeUselessABI.json'
import genericABI from './abi/erc20.json'
import uselessABI from './abi/useless.json'
import {Contract} from "./Contract";
import SurgeToken from "./SurgeToken";

export default function ({address, abi}) {
    return class StakeableSurge extends Token({address, abi: surgeUselessABI}) {
        // sleep(ms) {
        //     return new Promise(resolve => setTimeout(resolve, ms));
        // }
        async stakeUnderlyingAsset(amount){
            return this.methods.stakeUnderlyingAsset(amount).send();
        }
        // async getAddressOfUnderLyingAsset() {
        //     return this.methods._token().call();
        // }
        //

        async symbol() {
            return this.methods.symbol().call();
        }

        async getAddressOfContract() {
            return address || this.contract.address
        }

        async calculatePrice() {
            return this.methods.calculatePrice().call();
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
        //
        // async getBuyFee() {
        //     console.error("getBuyFee(): ", this.methods)
        //     return this.methods.buyFee().call();
        // }
        //
        // async getSellFee() {
        //     console.error("getSellFee(): ", this.methods)
        //     return this.methods.sellFee().call();
        // }
        //
        // async getTransferFee() {
        //     console.error("getTransferFee(): ", this.methods)
        //     return this.methods.transferFee().call();
        // }
    }
}
