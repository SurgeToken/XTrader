import {SurgeBNB} from './contracts'

const sender  = "0x2839EF5E2E778B2c12F87964205805ddB371a48c";


test("surge token creation", async () => {
    const token = new SurgeBNB(undefined, sender);
    let decimals = await token.decimals()
    expect(decimals === 0);
    expect(await token.balanceOf() === 614643445);


})
