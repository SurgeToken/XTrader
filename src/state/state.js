import { atom } from "recoil";
import contracts from "../contracts/contracts";

export const selectedTokenState = atom({
    name: "selectedToken",
    default: contracts.SurgeBnb,
});
