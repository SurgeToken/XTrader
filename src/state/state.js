import { atom, selector } from "recoil";


const contractPrices = atom({
        key: 'contractPrices',
        default: {}
    }
)
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
                if (key[0] !== 'x' && key != 'BNB') {
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

const contractFees = atom({
    key: "contractFees",
    default: {}
})

const walletFundsTimeTillClaim = atom({
    key: "walletFundsTimeTillClaim",
    default: null
})

const walletFundsClaimableBNB = atom({
    key: "walletFundsClaimableBNB",
    default: null
})

const relPricesBNB = atom({
    key: "relPricesBNB",
    default: null
})
const relPricesBUSD = atom({
    key: "relPricesBUSD",
    default: null
})
const uselessBalance = atom({
    key: "uselessBalance",
    default: null
})
// const wallet = atom({
//     key: "wallet",
//     default: null
// })

export default {
    contractPrices, walletHoldings, walletHoldingValues, walletConnected, walletAccount, contracts, contractFees, nativeSurge, xTokens, allTokens, walletFundsTimeTillClaim, walletFundsClaimableBNB, relPricesBNB, relPricesBUSD, uselessBalance
};
