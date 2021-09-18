import SurgeToken from "./SurgeToken";
import NativeSurge from "./NativeSurge";
import ExemptToken from "./ExemptToken";
import XBridgeManager from "./XBridgeManager";
import XBridge from "./XBridge";

import SurgeFundContract from "./SurgeFundContract";
export const SurgeFund = SurgeFundContract({address: "0x95c8eE08b40107f5bd70c28c4Fd96341c8eaD9c7"});

// export const SurgeBNB = SurgeToken({address: "0xE1E1Aa58983F6b8eE8E4eCD206ceA6578F036c21"});
export const SurgeUSD = SurgeToken({address:"0x14fEe7d23233AC941ADd278c123989b86eA7e1fF" });
export const SurgeETH = NativeSurge({address: "0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef"});
export const SurgeBTC = NativeSurge({address: "0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1"})
export const SurgeADA = NativeSurge({address: "0x0f897356b64d67c6ada04ac2639e411348409c46"})
// export const xSurgeUSD = ExemptToken({address: "0x0098118D10d9Fc2c45b2dA0051ffc4E3E5285fA4"});
// export const xSurgeETH = ExemptToken({address: "0x2410627444550129b67aB571A8f5A030BC578e7c"});
export const BridgeCreator = XBridgeManager({address: "0x9aE62bf5bB99EfcFb4dCC7E8389Fa0BF68839263"});
export const Bridge = XBridge;

export default {
    SurgeFund,
    // SurgeBNB,
    SurgeETH,
    SurgeUSD,
    SurgeBTC,
    SurgeADA
//     xSurgeETH,
//     xSurgeUSD
}
