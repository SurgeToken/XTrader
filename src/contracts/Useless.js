import Token from "./Token";
import uselessABI from "./abi/useless.json";
// const address = "0x2cd2664Ce5639e46c6a3125257361e01d0213657"
export default ({address}) => {
    return class UselessToken extends Token({address:address, abi: uselessABI}) {
        async getAddressOfContract() {
            return address || this.contract.address
        }
        async balanceOf(userAddress) {
            // this.useless = await (new (Token({address: "0x2cd2664Ce5639e46c6a3125257361e01d0213657", abi:uselessABI}))(this.provider)).balanceOf()
            return this.methods.balanceOf(userAddress).call();
        }
        async allowance(userAddress, surgeTokenAddress) {
            //from address, surge token addres
            return this.methods.allowance(userAddress, surgeTokenAddress).call();
        }
        async approve(surgeTokenAddress, amount) {
            //from address, surge token addres
            return this.methods.approve(surgeTokenAddress, amount).send();
        }
    }
}