import Contract from "./Contract"
import liquidityProviderABI from "./abi/LiquidityProvider_metadata.json"

export default class LiquidityProvider extends Contract({address, abi:liquidityProviderABI}) {

    async getPriceOfTokenInToken(addressOfToken1, addressOfToken2, amountofToken1) {
        const price = this.methods.getPriceOfTokenInToken(addressOfToken1, addressOfToken2, amountofToken1 * 1000000);
        return price / 1000000
    }
}
