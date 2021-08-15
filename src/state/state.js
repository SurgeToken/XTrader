import { atom } from "recoil";
import {Contracts} from "../common/contracts";

export const selectedTokenState = atom({
    name: "selectedToken",
    default: Contracts.SurgeBnb,
});