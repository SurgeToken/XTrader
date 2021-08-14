import SurgeToken from "./SurgeToken"

test("surge token creation", async () => {
    const token = new SurgeToken("0xE1E1Aa58983F6b8eE8E4eCD206ceA6578F036c21", "0x2839EF5E2E778B2c12F87964205805ddB371a48c");
    let decimals = await token.decimals()
    expect(decimals === 0);
    expect(await token.balance() === 614643445);


})
