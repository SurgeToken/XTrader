import Web3 from "web3";
export const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const FALLBACK_PROVIDER = 'https://bsc-dataseed1.binance.org:443';
/*
    A Contract class generator to eliminate requiring the ABI with every contract created
 */
export const Contract = ({address, abi}) => {
    return class GenericContract {
        constructor(provider, senderAddress=address) {
            this.web3 = new Web3(provider || FALLBACK_PROVIDER);
            this.contract = new this.web3.eth.Contract(abi, address);
            this.address = this.contract.defaultAccount = address;
            try{
                this.web3.eth.getAccounts().then((account) => {
                    this.contract.options.from =  account[0] === undefined ? senderAddress : account[0];
                });
            }catch (e) {

            }
            this.methods = this.contract.methods;
        }

    }

}
