import SurgeToken from "./SurgeToken.js"

test("surge token creation", () => {
    const token = new SurgeToken("0xE1E1Aa58983F6b8eE8E4eCD206ceA6578F036c21");
    console.log(token.decimals);

})
