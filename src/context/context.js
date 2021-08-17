import React from "react";

const context = {
    wallet: {
        wallet: null,
        // holdings: {}
    }
}
export const WalletContext = React.createContext(context.wallet)
