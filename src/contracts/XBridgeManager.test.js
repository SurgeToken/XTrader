import {BridgeCreator} from "./contracts"
const sender  = "0x2839EF5E2E778B2c12F87964205805ddB371a48c";

test("XBridgeManager testing", async () => {
    // let isConnected = false;
    const manager = new BridgeCreator(null, sender)
    let bridge = await manager.createXBridge(sender);
    console.log(bridge);
    expect(await manager.isXBridge(bridge) === 1);
    // expect(manager.getXBridgeAddress("0x2839EF5E2E778B2c12F87964205805ddB371a48c") === 0);
    // let bridge = await manager.getXBridge("0x2839EF5E2E778B2c12F87964205805ddB371a48c");
    // await bridge.setBridgeName("Nancy");
    // expect(await bridge.getBridgeName() === "Nancy");
    // expect(xBridgeManager.createXBridge())
    // expect(xBridgeManager.connnected === true);
})
