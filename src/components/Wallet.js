import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import coinbaseLogo from "../images/coinbase.svg";
import { WalletLink } from "walletlink";
import contracts from "../contracts/contracts";
import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { WalletContext } from "../context/context";

/*
    This is the Wallet context provider
    A work in progress
 */

//Removed https://bsc-dataseed1.binance.org:443 on 11.02.21@2230CDT
const providerOptions = {
	walletConnectMainNet: {
		appName: "xSurge",
		network: "binance",
		rpc: {
			56: "https://speedy-nodes-nyc.moralis.io/bcd1a0b5aca5fc417cb55a82/bsc/mainnet",
		},
		chainId: 56,
	},
	walletConnectTestNet: {
		appName: "xSurge",
		network: "binance",
		rpc: {
			56: "https://data-seed-prebsc-1-s1.binance.org:8545/",
		},
		chainId: 56,
	},
};

const web3Modal = new Web3Modal({
	network: "binance",
	cacheProvider: true,
	providerOptions: {
		walletconnect: {
			package: WalletConnectProvider,
			options: providerOptions.walletConnectMainNet,
		},
		"custom-coinbase": {
			display: {
				logo: coinbaseLogo,
				name: "Coinbase",
				description: "Scan with WalletLink to connect",
			},
			options: providerOptions.walletConnectMainNet,
			package: WalletLink,
			connector: async () => {
				const walletLink = new WalletLink({
					appName: providerOptions.walletConnectMainNet.appName,
				});
				const provider = walletLink.makeWeb3Provider(
					providerOptions.walletConnectMainNet.rpc["56"],
					56
				);
				await provider.enable();
				return provider;
			},
		},
	},
});

function useProvider(connect) {
	const [provider, setProvider] = useState(null);
	useEffect(() => {
		async function connectProvider() {
			try {
				setProvider(await web3Modal.connect());
			} catch (err) {
				if (err === undefined) {
					alert(
						"If you are having trouble connecting to MetaMask, please check if you still have a pending connection request"
					); //TODO still checking wallet library to catch MetamskError better
				}
				console.error(err, provider); // TODO Toast notification
				if (provider !== null) {
					setProvider(null);
					await provider.disconnect();
				}
				// TODO pass this to a callback for a modal popup
				throw err;
			}
		}
		async function disconnectProvider() {
			if (provider !== null && provider.connected) {
				try {
					await provider.disconnect();
				} catch (err) {
					// TODO this should display the error
					console.log("Failed to disconnect wallet", err);
				}

				await provider.disconnect();
			}
			setProvider(null);
		}
		connect ? connectProvider() : disconnectProvider();
	}, [connect]);
	return provider;
}

function web3EventHandler(web3, setEvent, results, data) {
	if (web3) {
		const address = web3.eth.defaultAccount;
		if (
			data.returnValues &&
			(data.returnValues[0] === address || data.returnValues[1] === address)
		) {
			setEvent(data);
		}
	}
}

function useContracts(web3, update, setEvent) {
	const [holdings, setHoldings] = useState({});
	useEffect(() => {
		async function getHoldings() {
			const newHoldings = {};
			for (let key of Object.keys(contracts)) {
				const contract = new contracts[key](
					web3,
					web3.eth.defaultAccount,
					web3EventHandler.bind(null, web3, setEvent)
				);
				const symbol = await contract.symbol();
				let balance = parseInt(
					await contract.balanceOf(web3.eth.defaultAccount)
				);
				let decimals = parseInt(await contract.decimals());
				newHoldings[symbol] = {
					contract,
					symbol: symbol,
					balance: (decimals ? balance * 0.1 ** decimals : balance).toFixed(4),
					price: await contract.price(),
					value: await contract.value(balance),
				};
			}
			setHoldings(newHoldings);
			setEvent(null);
			return newHoldings;
		}

		if (web3 !== null) getHoldings();
	}, [web3, update]);
	return holdings;
}

function useWeb3(provider) {
	const [web3, setWeb3] = useState(null);
	useEffect(() => {
		async function web3Init() {
			const newWeb3 = new Web3(provider);
			setWeb3(newWeb3);
			newWeb3.eth.defaultAccount = (await newWeb3.eth.getAccounts())[0];
		}
		provider !== null ? web3Init() : setWeb3(null);
	}, [provider]);
	return web3;
}

export const Wallet = ({ errorHandler, children }) => {
	const [connect, setConnect] = useState(false);
	const [event, setEvent] = useState(null);
	// a hook to connect to the wallet provider
	const provider = useProvider(connect, errorHandler);
	// web3 hook after provider is connected
	const web3 = useWeb3(provider);
	// create contracts and get holdings
	const holdings = useContracts(web3, event !== null, setEvent);
	// use a hook to get the address of the account once the provider is connected
	return (
		<WalletContext.Provider
			value={{ provider, web3, holdings, connect: setConnect, event }}
		>
			{children}
		</WalletContext.Provider>
	);
};
