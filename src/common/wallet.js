import Web3 from "web3";
// import {provider} from "./walletConnect";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {WalletLink} from "walletlink";
import coinbaseLogo from '../images/coinbase.svg';
import contracts from "../contracts/contracts";
import {tokenPools} from "../contracts/TokenConversion"
import Token from "../contracts/Token";
import uselessABI from "../contracts/abi/useless.json";
import {useRecoilState} from "recoil";
import state from "../state/state";



export const providerOptions = {
    walletConnectMainNet: {
        appName: 'xSurge',
        network: "binance",
        rpc: {
            56: 'https://bsc-dataseed1.binance.org:443'
        },
        chainId: 56
    },
    walletConnectTestNet: {
        appName: 'xSurge',
        network: "binance",
        rpc: {
            56: "https://data-seed-prebsc-1-s1.binance.org:8545/"
        },
        chainId: 56
    }
};

const web3Modal = new Web3Modal({
    network: "binance",
    cacheProvider: true,
    providerOptions: {
        walletconnect: {
            package: WalletConnectProvider,
            options: providerOptions.walletConnectMainNet

        },
        'custom-coinbase': {
            display: {
                logo: coinbaseLogo,
                name: 'Coinbase',
                description: 'Scan with WalletLink to connect',
            },
            options: providerOptions.walletConnectMainNet,
            package: WalletLink,
            connector: async () => {
                const walletLink = new WalletLink({
                    appName: providerOptions.walletConnectMainNet.appName
                });
                const provider = walletLink.makeWeb3Provider(providerOptions.walletConnectMainNet.rpc["56"], 56);
                await provider.enable();
                return provider;
            },
        }
    },

});


export default class Wallet {
    provider = null;
    contracts = {};
    contractFees = {};
    holdings = {};
    holdingValues = {};
    prices = {};
    accountAddress = null;

    updateInterval = 15 * 1000 // 15 seconds

    /*
    funds vars
     */
    SurgeFundsContract = null;
    timeTillClaim = null;
    claimableBNB = null;
    /*
    token conversion vars
     */
    tokenPools = {BNB:{}, BUSD:{}};
    // BNBRelPrices = {}
    // BUSDRelPrices = {}
    relPricesBNB = {};
    relPricesBUSD = {};
    /*
   useless balance
    */
    uselessBalance = {display: 0, math: 0};
    uselessContract = null;

    constructor(onTimeTillClaimChange, onClaimableBNBChange, onHoldingsChanged, onHoldingValuesChanged, onPricesChanged, onRelPricesBNBChanged, onRelPricesBUSDChanged, onUselessBalanceChanged, onConnected, onDisconnected) {
        this.onHoldingsChanged = onHoldingsChanged || (() => {
        });
        this.onHoldingValuesChanged = onHoldingValuesChanged || (() => {
        });
        this.onPricesChanged = onPricesChanged || (() => {
        });
        this.onConnected = onConnected || (() => {
        });
        this.onDisconnected = onDisconnected || (() => {
        });
        /*
        funds onchanges
         */
        this.onTimeTillClaimChange = onTimeTillClaimChange || (() => {
        });
        this.onClaimableBNBChange = onClaimableBNBChange || (() => {
        });
        /*
        token conversion onchanges
         */
        this.onRelPricesBNBChanged = onRelPricesBNBChanged || (() => {
        });
        this.onRelPricesBUSDChanged = onRelPricesBUSDChanged || (() => {
        });
        /*
        useless balance
        */
        this.onUselessBalanceChanged = onUselessBalanceChanged || (() => {
        });

    }

    initializeValues() {
        this.addHoldings();
        this.addHoldingValues();
        this.getTimeTillClaim();
        this.getClaimable();
        this.getPrice()
        this.getConversionsToBNB()
        this.getConversionsToUSD()
        this.getUselessBalance()
    }

    async account() {
        if (this.provider !== null) {
            const account = (await this.web3.eth.getAccounts())[0] || null;
            this.accountAddress = account;
            return account;
        }
    }

    get connected() {
        return this.provider !== null && this.provider.connected;
    }

    async updatePrice(symbol) {
        this.contracts[symbol].calculatePrice().then((price) => {
            let parsedPrice = parseFloat(price)/ Math.pow(10, 18)
            if (parsedPrice !== this.prices[symbol]) {
                this.prices[symbol] = parsedPrice;
                this.onPricesChanged(symbol, parsedPrice);
            }
        })
    }

    async getPrice() {
        const symbols = Object.keys(this.contracts);
        for (let index in symbols) {
            try {
                let symbol = symbols[index];
                const price = this.prices[symbol] = parseFloat(await this.contracts[symbol].calculatePrice())/ Math.pow(10, 18);
                this.onPricesChanged(symbol, price);
                setInterval(this.updatePrice.bind(this, symbol), this.updateInterval);
            }catch (e) {
            }
        }
    }

    updateBalance() {
        this.web3.eth.getBalance(this.accountAddress).then(
            (value) => {
                if (value !== this.holdings['BNB']) {
                    this.holdings['BNB'] = value;
                    this.onHoldingsChanged('BNB', value);
                }
            });
    }

    updateHolding(symbol) {
        this.contracts[symbol].balanceOf().then((balance) => {
            if (balance !== this.holdings[symbol]) {
                this.holdings[symbol] = balance;
                this.onHoldingsChanged(symbol, balance);
            }
        })
    }

    updateHoldingValues(symbol) {
        this.contracts[symbol].getValueOfHoldings().then((holdingValue) => {
            if (holdingValue !== this.holdingValues[symbol]) {
                this.holdingValues[symbol] = holdingValue;
                this.onHoldingValuesChanged(symbol, holdingValue);
            }
        })
    }

    async addHoldings() {
        this.holdings['BNB'] = await this.web3.eth.getBalance(this.accountAddress);
        setInterval(this.updateBalance.bind(this), this.updateInterval);
        this.onHoldingsChanged('BNB', this.holdings['BNB']);
        const symbols = Object.keys(this.contracts);
        for (let index in symbols) {
            let symbol = symbols[index];
            const balance = this.holdings[symbol] = await this.contracts[symbol].balanceOf();
            this.onHoldingsChanged(symbol, balance);
            setInterval(this.updateHolding.bind(this, symbol), this.updateInterval);
        }
    }

    async addHoldingValues() {
        const symbols = Object.keys(this.contracts);
        for (let index in symbols) {
            try {
                let symbol = symbols[index];
                const holdingValue = this.holdingValues[symbol] = await this.contracts[symbol].getValueOfHoldings();
                this.onHoldingValuesChanged(symbol, holdingValue);
                setInterval(this.updateHoldingValues.bind(this, symbol), this.updateInterval);
            }catch (e) {
                // console.log("Failed to get value of holding of ", symbols[index], ": ", e);
            }
        }
    }

    async addContracts() {
        const contractNames = Object.keys(contracts);
        // console.error(contracts)
        for(let index in contractNames) {
            // console.log(contractNames[index])
            const contract = new contracts[contractNames[index]](this.provider);
            if (contractNames[index] === "SurgeFund"){
                this.SurgeFundsContract = contract
            }
            else if (contractNames[index] === "Useless"){
                this.uselessContract = contract
            }
            else {
                const symbol = await contract.symbol();
                // console.log(contractNames[index], symbol, typeof contract.getFees)
                if (typeof contract.getFees === "function") {
                    this.contractFees[symbol] = await contract.getFees();
                } else {
                    // console.log(symbol, typeof contract.getFees)
                    try {
                        if (symbol === "SUSD")
                            this.contractFees[symbol] = {
                                0: 94,
                                1: 94,
                                2: 98
                            };
                        else if (symbol === "SUSLS") {
                            this.contractFees[symbol] = {
                                0: 94,
                                1: 94,
                                2: 96
                            };
                            // this.uselessContract = contract
                        }
                    } catch (e) {
                        // console.error(symbol, e)
                        // console.error(symbol, this.contractFees)

                        // this.SurgeFundsContract = new contracts[contractNames[index]](this.provider);
                    }
                }
            this.contracts[symbol] = contract
            }

        }
    }

    async connect() {
        try {
            const provider = this.provider;
            this.provider = await web3Modal.connect();
            this.web3 = new Web3(this.provider);
            const account = this.accountAddress = await this.account();
            if (provider !== this.provider) {
                await this.addContracts();
                await this.addTokenPoolContracts();
                this.initializeValues();

                // await this.contracts["SurgeUSLS"].getBalanceOfUnderlyingAsset();
            }
            // console.error(this.contracts)
            this.onConnected();

            // TODO Try something like this below at a later date
            // this.subscription = this.web3.eth.subscribe("logs", {address: account}, (error, result) => {
            //     console.log("result", result);
            // });
        } catch (err) {
            if (err === undefined) {
                alert('If you are having trouble connecting to MetaMask, please check if you still have a pending connection request') //TODO still checking web3Modal library to catch MetamskError better
            }

            if (this.provider !== null &&
                !(typeof this.provider === "undefined") && //used this type of check because sometimes if (this.provider === undefined) fails
                (typeof this.provider.close === 'function')) { //check if this.provider.close is marked as function before calling it
                await this.provider.close();
            }
            // TODO pass this to a callback for a modal popup
            throw err;
        }
    }

    async disconnect() {
        if (this.provider != null && this.provider.connected) {
            try {
                await this.provider.disconnect();
            } catch (err) {
                console.log("Failed to disconnect wallet", err);
            }

            await this.provider.close();
            this.provider = null;
            this.accountAddress = 0;
        }
        this.onDisconnected();
    }

    convert(to, from, value) {

    }

    /*
    funds section
     */
    async updateTimeTillClaim() {
        // const [, setTimeTillClaim] = useRecoilState(state.fundsTimeTillClaim);
        // this.SurgeFundsContract.secondsUntilNextClaim().then((time) => {
        //     this.timeTillClaim = time;
        //     this.onTimeTillClaimChange(time);
        //     // setTimeTillClaim(this.timeTillClaim)
        // })
        let time = await this.SurgeFundsContract.secondsUntilNextClaim();
        this.timeTillClaim = time;
        this.onTimeTillClaimChange(time);
    }

    async getTimeTillClaim() {
        const timeTillClaim = this.timeTillClaim = await this.SurgeFundsContract.secondsUntilNextClaim();
        this.onTimeTillClaimChange(timeTillClaim);
        setInterval(this.updateTimeTillClaim.bind(this), this.updateInterval);
    }
    async updateClaimable() {
        // this.SurgeFundsContract.usersCurrentClaim().then((claimableBNB) => {
        //     // this.claimableBNB = claimableBNB / Math.pow(10, 18);
        //     // this.onClaimableBNBChange(claimableBNB / Math.pow(10, 18));
        // })

        let claimableBNB = await this.SurgeFundsContract.usersCurrentClaim();
        this.claimableBNB = claimableBNB / Math.pow(10, 18);
        this.onClaimableBNBChange(claimableBNB / Math.pow(10, 18));
    }

    async getClaimable() {
        const claimableBNB = await this.SurgeFundsContract.usersCurrentClaim() / Math.pow(10,18);
        this.claimableBNB = claimableBNB;
        this.onClaimableBNBChange(claimableBNB);
        setInterval(this.updateClaimable.bind(this), this.updateInterval);
    }
    /*
    token conversion section
     */
    async updateConversionsToBNB(key) {
        // this.tokenPools[tokenA][key].getReserves().then((reserves) => {
        //     const relPrice = reserves[1]/reserves[0]
        //     if (relPrice !== this.relPrices["BNB"][key]) {
        //         this.relPrices["BNB"][key] = relPrice;
        //         this.onRelPricesChanged(key, relPrice);
        //     }
        // })
        try {
            const reserves = await this.tokenPools.BNB[key].getReserves()
            const relPrice = reserves[1] / reserves[0]
            // const relPrice = this.tokenPools.BNB[key].getReserves().then((reserves) => {
            //     console.error(key, reserves)
            //     return (reserves[1] / reserves[0])
            // })
            if (relPrice !== this.relPricesBNB[key]) {
                this.relPricesBNB[key] = relPrice;
                this.onRelPricesBNBChanged(key, relPrice);
            }
        }catch (e) {}
    }
    async updateConversionsToUSD(key) {
        try {

            const reserves = await this.tokenPools.BUSD[key].getReserves()
            const relPrice = reserves[1] / reserves[0]
            // const relPrice = this.tokenPools.BUSD[key].getReserves().then((reserves) => {
            //     return reserves[1] / reserves[0]
            // })
            if (relPrice !== this.relPricesBUSD[key]) {
                this.relPricesBUSD[key] = relPrice;
                this.onRelPricesBUSDChanged(key, relPrice);
            }
        }catch (e) {}

    }

    async getConversionsToBNB() {
        for(let key in tokenPools["BNB"]) {
            const reserves = await this.tokenPools["BNB"][key].getReserves();
            const relPrice = this.relPricesBNB[key] = reserves[1]/reserves[0]
            this.onRelPricesBNBChanged(key, relPrice);
            setInterval(this.updateConversionsToBNB.bind(this, key), this.updateInterval);
        }
    }

    async getConversionsToUSD() {
        for(let key in tokenPools["BUSD"]) {
            if (key !== "SUSD") {
                const reserves = await this.tokenPools["BUSD"][key].getReserves();
                const relPrice = this.relPricesBUSD[key] = reserves[1]/reserves[0]
                this.onRelPricesBUSDChanged(key, relPrice);
                setInterval(this.updateConversionsToUSD.bind(this, key), this.updateInterval);
            } else {
                const relPrice = this.relPricesBUSD[key] = 1;
                this.onRelPricesBUSDChanged(key, relPrice);
            }

        }
    }

    async addTokenPoolContracts() {
        for(let key in tokenPools["BNB"]) {
            try {
                this.tokenPools["BNB"][key] = new tokenPools["BNB"][key]();
            } catch (e) {
                console.error(e)
            }
        }
        for(let key in tokenPools["BUSD"]) {
            try {
                this.tokenPools["BUSD"][key] = new tokenPools["BUSD"][key]();
            } catch (e) {
                if (key === "SUSD")
                    this.tokenPools["BUSD"][key] = {};
                else
                    console.error(e)
            }
        }
    }
    /*
    useless balance
     */
    async updateUselessBalance() {
        const balance = await this.uselessContract.balanceOf(this.accountAddress)
        const uselessBalance = {display: balance * 1.0e-9, math: balance}
        if (uselessBalance.math !== this.uselessBalance.math) {
            this.uselessBalance = uselessBalance;
            this.onUselessBalanceChanged(uselessBalance);
        }
    }
    async getUselessBalance() {
        const balance = await this.uselessContract.balanceOf(this.accountAddress)
        const uselessBalance = this.uselessBalance = {display: balance * 1.0e-9, math: balance}
        this.onUselessBalanceChanged(uselessBalance);
        // this.uselessContract = new contracts["Useless"]();
        setInterval(this.updateUselessBalance.bind(this), this.updateInterval);
    }
}
//
// export async function getAccount() {
//     if (!provider) {
//         return;
//     }
//     const web3 = new Web3(provider);
//     const accounts = await web3.eth.getAccounts();
//     return accounts[0] || null
// }

// export function isConnected() {
//     if (provider && provider.connected) return true;
//     else return false;
// }
//
// export function numberToWei(num) {
//     const web3 = new Web3(provider);
//     return parseInt(web3.utils.toWei(String(num), "ether")).toString(16);
// }
//
// export function numberFromWei(wei) {
//     const web3 = new Web3(provider);
//     return web3.utils.fromWei(String(wei), "ether");
// }
//
// /**
//  * @param {string} account the account of the wallet
//  * @return Promise<string>
//  * */
// export async function getBNBBalance(account) {
//     if (!provider) return null;
//     const web3 = new Web3(provider);
//     const balance = await web3.eth.getBalance(account);
//     return numberFromWei(balance);
// }
//
// /**
//  * @param {any} contract the surge contract to read the balance from
//  * @param {string} account the account of the wallet
//  * @return Promise<string>
//  * */
// export async function getSurgeBalance(contract, account) {
//     if (!provider) return null;
//     const web3 = new Web3(provider);
//     const Contract = new web3.eth.Contract(contract.abi, contract.address);
//     return Contract.methods.balanceOf(account).call();
// }
