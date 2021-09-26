import Factory from "./Factory";
import Pool from "./Pool";

// export const factory = Factory({address:"0xBCfCcbde45cE874adCB698cC183deBcF17952812"});
export const tokenPools = {
    // BNB: {
    //     SUSD: Pool({address: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16"}),
        SUSD: Pool({address: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE"}),
        SETH: Pool({address: "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc"}),
        SBTC: Pool({address: "0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082"}),
        SADA: Pool({address: "0x28415ff2C35b65B9E5c7de82126b4015ab9d031F"})
    // },
    // BUSD:{}
};
// export const toUSD = {
//     // SUSD:Pool({address: "0x70D8929d04b60Af4fb9B58713eBcf18765aDE422"}),
//     SETH:Pool({address: "0x1B96B92314C44b159149f7E0303511fB2Fc4774f"}),
//     SBTC:Pool({address: "0x7561EEe90e24F3b348E1087A005F78B4c8453524"}),
//     SADA:Pool({address: "0xBA51D1AB95756ca4eaB8737eCD450cd8F05384cF"})
// };
export default {
    tokenPools,
    // toUSD
}