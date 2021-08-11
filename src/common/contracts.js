export const Contracts = {
    SurgeBnb: {
        name: 'sBNB',
        address: "0xE1E1Aa58983F6b8eE8E4eCD206ceA6578F036c21",
        abi: require("../abi/SurgeBNB.json"),
    },
    SurgeUsd: {
        name: 'sUSD',
        address: "0x14fEe7d23233AC941ADd278c123989b86eA7e1fF",
        abi: require("../abi/SurgeBNB.json"),
    },
    SurgeEth: {
        name: 'sETH',
        address: "0x0000000000000000000000000000000000000000", //TODO wait for sETH contract
        abi: require("../abi/SurgeBNB.json"),
    },
};

/**
 * Get a list of all contracts
 * @returns {*[]}
 */
export function getAllContracts() {
    const contracts = [];

    for (const key of Object.keys(Contracts)) {
        contracts.push(Contracts[key]);
    }

    return contracts;
}

/**
 * Get a specific contract by his key
 * @return {name, address, abi}
 * */
export function getContractByName(key) {
    return Contracts[key];
}