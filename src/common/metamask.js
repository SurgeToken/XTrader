import Web3 from 'web3'

const web3 = new Web3(window.ethereum)

export const DESIRED_CHAIN_ID = "0x38"

export async function getCurrentAccount() {
    const accounts = await web3.eth.getAccounts()
    return accounts[0] || null
}

export function numberToWei(num) {
    return parseInt(web3.utils.toWei(String(num), "ether")).toString(16)
}

export function hasMetamask() {
    return (typeof window.ethereum !== 'undefined') && window.ethereum.isMetaMask
}

export function isConnected() {
    return hasMetamask() && window.ethereum.isConnected() === true
}

export async function connectMetamask() {
    return window.ethereum.request({ method: 'eth_requestAccounts' })
}

export async function switchToBsc() {
    try {
        return window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: DESIRED_CHAIN_ID }],
        })
    } catch (err) {
        if (err.code === 4902) { // chain has not been added
            return window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: DESIRED_CHAIN_ID,
                    chainName: 'BSC Mainnet',
                    nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18,
                    },
                    rpcUrls: ['https://bsc-dataseed.binance.org/'],
                    blockExplorerUrls: ['https://bscscan.com'],
                }],
            })
        }
    }
}

export async function getSelectedAddress() {
    return window.ethereum.selectedAddress;
}

export async function getCurrentChainId() {
    return window.ethereum.request({ method: 'eth_chainId' })
}

export function onChainChanged(fn) {
    window.ethereum.on('chainChanged', (chainId) => fn(chainId))
}

export function onAccountsChanged(fn) {
    window.ethereum.on('accountsChanged', (accounts) => fn(accounts))
}