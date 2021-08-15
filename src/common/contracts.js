export const Contracts = {
    SurgeBnb: {
        name: 'sBNB',
        address: "0xE1E1Aa58983F6b8eE8E4eCD206ceA6578F036c21",
        abi: require("../contracts/abi/SurgeToken.json"),
        buyCurrency: 'BNB',
    },
    SurgeUsd: {
        name: 'sUSD',
        address: "0x14fEe7d23233AC941ADd278c123989b86eA7e1fF",
        abi: require("../contracts/abi/SurgeUSD.json"),
        buyCurrency: 'BNB',
    },
    SurgeEth: {
        name: 'sETH',
        address: "0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef",
        abi: require("../contracts/abi/SurgeETH.json"),
        buyCurrency: 'BNB',
    },
    XSurgeBnb: {
        name: 'xsETH',
        address: "0x00",
        abi: require("../contracts/abi/SurgeETH.json"),
        buyCurrency: 'ETH',
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
