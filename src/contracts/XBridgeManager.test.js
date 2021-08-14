import XBridgeManager from "./XBridgeManager";
import {providerOptions} from '../common/walletConnect';
import WalletConnectProvider from "@walletconnect/web3-provider";


const sender  = "0x2839EF5E2E778B2c12F87964205805ddB371a48c";

test("XBridgeManager testing", async () => {
    let isConnected = false;
    const manager = new XBridgeManager(sender)
    expect(manager.getXBridgeAddress("0x2839EF5E2E778B2c12F87964205805ddB371a48c") === 0);
    let bridge = await manager.getXBridge("0x2839EF5E2E778B2c12F87964205805ddB371a48c");
    await bridge.setBridgeName("Nancy");
    expect(await bridge.getBridgeName() === "Nancy");
    // expect(xBridgeManager.createXBridge())
    // expect(xBridgeManager.connnected === true);
})
