import Token from "./Token";
import surgeTokenABI from './abi/SurgeToken.json'
const SBNB = Token({address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", abi: surgeTokenABI});
const sender  = "0x2839EF5E2E778B2c12F87964205805ddB371a48c";


test("Token testing", async () => {
    const sbnb = new SBNB(undefined, sender);
    expect(sbnb.contract.defaultAccount === sender);
    expect(await sbnb.balanceOf() === 51.739)
})
