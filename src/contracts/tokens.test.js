import {SurgeBNB} from "./tokens";

test("testing default construction", async () => {
    const contract = new SurgeBNB();
    expect(await contract.balanceOf() !== 0);
})
