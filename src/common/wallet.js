import Web3 from "web3";
// import {provider} from "./walletConnect";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {WalletLink} from "walletlink";
import coinbaseLogo from '../images/coinbase.svg';
import contracts from "../contracts/contracts";

import {EventEmitter} from "events";
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
    holdings = {};
    holdingValues = {};
    accountAddress = null;

    updateInterval = 15 * 1000 // 15 seconds

    /*
    funds stuff
     */
    SurgeFundsContract = null;
    timeTillClaim = null;
    claimableBNB = null;


    constructor(onTimeTillClaimChange, onClaimableBNBChange, onHoldingsChanged, onHoldingValuesChanged, onConnected, onDisconnected) {
        this.onHoldingsChanged = onHoldingsChanged || (() => {
        });
        this.onHoldingValuesChanged = onHoldingValuesChanged || (() => {
        });
        this.onConnected = onConnected || (() => {
        });
        this.onDisconnected = onDisconnected || (() => {
        });
        /*
        funds stuff
         */
        this.onTimeTillClaimChange = onTimeTillClaimChange || (() => {
        });
        this.onClaimableBNBChange = onClaimableBNBChange || (() => {
        });
    }

    initializeValues() {
        this.addHoldings();
        this.addHoldingValues();
        this.getTimeTillClaim();
        this.getClaimable();
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
            // console.error(holdingValue)
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
        for(let index in contractNames) {
            try {
                const contract = new contracts[contractNames[index]](this.provider);
                const symbol = await contract.symbol();
                this.contracts[symbol] = contract;
            } catch (e) {
                this.SurgeFundsContract = new contracts[contractNames[index]](this.provider);
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
                this.initializeValues();
            }
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
        //     // console.error("updateTimeTillClaim => ", time);
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
        //     // console.error("updateClaimable => ", claimableBNB);
        //     this.claimableBNB = claimableBNB / Math.pow(10, 18);
        //     this.onClaimableBNBChange(claimableBNB / Math.pow(10, 18));
        // })

        let claimableBNB = await this.SurgeFundsContract.usersCurrentClaim;
        this.claimableBNB = claimableBNB / Math.pow(10, 18);
        this.onClaimableBNBChange(claimableBNB / Math.pow(10, 18));
    }

    async getClaimable() {
        const claimableBNB = await this.SurgeFundsContract.usersCurrentClaim / Math.pow(10,18);
        this.claimableBNB = claimableBNB;
        this.onClaimableBNBChange(claimableBNB);
        setInterval(this.updateClaimable.bind(this), this.updateInterval);
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
