import { atom, selector } from "recoil";


const walletHoldings = atom({
        key: 'walletHoldings',
        default: {}
    }
)
const walletHoldingValues = atom({
        key: 'walletHoldingValues',
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

const nativeSurge = selector({
        key: 'nativeSurge',
        get: ({get}) => {
            const nativeSurge = [];
            Object.keys(get('walletHoldings')).forEach((key) => {
                if (key[0] !== 'x' && key !== 'BNB') {
                    nativeSurge.push(key);
                }
            });
            return nativeSurge;
        }
})

const xTokens = selector({
    key: 'xTokens',
    get: ({get}) => {
        const xTokens = [];
        Object.keys(get('walletHoldings')).forEach((key) => {
            if (key[0] === 'x') {
                xTokens.push(key);
            }
        });
        return xTokens;
    }
})


const allTokens = selector({
    key: 'allTokens',
    get: ({get}) => {
        return get('nativeSurge') + get('xTokens');
    }
})

const contracts = atom({
    key: "contracts",
    default: {}
})

// const wallet = atom({
//     key: "wallet",
//     default: null
// })

export default {walletHoldings, walletHoldingValues, walletConnected, walletAccount, contracts, nativeSurge, xTokens, allTokens};
