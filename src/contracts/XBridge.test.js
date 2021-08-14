import XBridge from "./XBridge";


test("XBridgeManager testing", async () => {
    let isConnected = false;
    const bridge = new XBridge("0xAEac7b79403901a64738413c9EBfE418B9Dc7F2a");
    expect(await bridge.getBridgeName() === "Bridge");

})
