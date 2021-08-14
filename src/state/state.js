import { atom } from "recoil";

const bnbBalanceState = atom({
    name: 'bnbBalance',
    default: 0
});

const contractMapping = atom({
    name: 'contractMapping',
    default: {

    }
})
