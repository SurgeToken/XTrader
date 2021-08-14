import Web3 from "web3";
// export const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

/*
    A Contract class generator to eliminate requiring the ABI with every contract created
 */
export const Contract = (abiJSON) => {
    return class GenericContract {
        constructor(addressOfContract, provider) {
            this.web3 = new Web3(provider);
            this.contract = new this.web3.eth.Contract(abiJSON, addressOfContract);
            this.web3.eth.getAccounts((error, account) => {
                if (!error) this.contract.options.from = account
            })
            this.methods = this.contract.methods;
        }

    }

}
