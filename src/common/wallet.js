import Web3 from "web3";
// import {provider} from "./walletConnect";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {WalletLink} from "walletlink";
import coinbaseLogo from '../images/coinbase.svg';
import tokens from "../contracts/tokens";
import {EventEmitter} from "events";

export const providerOptions = {
    walletConnectMainNet: {
        appName: 'xSurge',
        network: "binance",
        rpc: {
            56: "https://bsc-dataseed1.binance.org/"
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
    accountAddress = null;
    updateInterval = 15 * 1000 // 15 seconds

    constructor(onHoldingChanged, onConnected, onDisconnected) {
        this.onHoldingsChanged = onHoldingChanged || (() => {
        });
        this.onConnected = onConnected || (() => {
        });
        this.onDisconnected = onDisconnected || (() => {
        });
        this.holdingsUpdater = this.updateHoldings.bind(this);
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

    updateHoldings() {
        this.web3.eth.getBalance(this.accountAddress).then(
            (value) => {
                if (value !== this.holdings['BNB']) {
                    this.holdings['BNB'] = value;
                    this.onHoldingsChanged('BNB', value);
                }
            });
        Object.keys(this.contracts).forEach(key => {
            this.contracts[key].balanceOf().then((balance) => {
                if (balance !== this.holdings[key]) {
                    this.holdings[key] = balance;
                    this.onHoldingsChanged(key, balance);
                }
            })
        })
    }

    addAssets() {
        this.updateHoldings();
        setInterval(() => {
            this.web3.eth.getBalance(this.accountAddress).then(
                (value) => {
                    if (value !== this.holdings['BNB']) {
                        this.holdings['BNB'] = value;
                        this.onHoldingsChanged('BNB', value);
                    }
                });
        }, this.updateInterval);
        Object.keys(tokens).forEach(key => {
            const token = new tokens[key](this.provider);
            token.symbol().then((symbol) => {
                    this.contracts[symbol] = token;
                    this.holdings[symbol] = 0;
                    setInterval(() => {
                        token.balanceOf().then((balance) => {
                            if (balance !== this.holdings[symbol]) {
                                this.holdings[symbol] = balance;
                                this.onHoldingsChanged(symbol, balance);
                            }
                        })
                    }, this.updateInterval);
                }
            )
        })
    }

    async connect() {
        try {
            const provider = this.provider;
            this.provider = await web3Modal.connect();
            this.web3 = new Web3(this.provider);
            const account = this.accountAddress = await this.account();
            if (provider !== this.provider) {
                this.addAssets();
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
            console.log(err);
            if (this.provider !== null) {
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
