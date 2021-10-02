import Factory from "./Factory";
import Pool from "./Pool";

// export const factory = Factory({address:"0xBCfCcbde45cE874adCB698cC183deBcF17952812"});
export const tokenPools = {
    BNB: {
    //     SUSD: Pool({address: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16"}),
        SUSD: Pool({address: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE"}),
        SETH: Pool({address: "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc"}),
        SBTC: Pool({address: "0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082"}),
        SADA: Pool({address: "0x28415ff2C35b65B9E5c7de82126b4015ab9d031F"}),
        SUSLS: Pool({address: "0x08A6cD8a2E49E3411d13f9364647E1f2ee2C6380"})
    },
    BUSD:{
        SUSD: "",
        SETH: Pool({address: "0x7213a321F1855CF1779f42c0CD85d3D95291D34C"}),
        SBTC: Pool({address: "0xF45cd219aEF8618A92BAa7aD848364a158a24F33"}),
        SADA: Pool({address: "0x1E249DF2F58cBef7EAc2b0EE35964ED8311D5623"}),
        // SUSLS: Pool({address: "0x1E249DF2F58cBef7EAc2b0EE35964ED8311D5623"})
    }
};
export default {
    tokenPools,
    // toUSD
}