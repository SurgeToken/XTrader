import { atom } from "recoil";


const walletHoldings = atom({
        key: 'walletHoldings',
        default: {}
    }
)

const walletConnected = atom({
    key: "walletConnected",
    default: false
})

const walletAccount = atom({
    key: "walletAccount",
    default: ''
})

const contracts = atom({
    key: "contracts",
    default: {}
})

// const wallet = atom({
//     key: "wallet",
//     default: null
// })

export default {walletHoldings, walletConnected, walletAccount, contracts};
