// Libs
import React, { useState } from "react";
// import Web3Modal from "web3modal"
// import WalletConnectProvider from "@walletconnect/web3-provider";

// Components
import Trade from "./components/NativeSurgeTrader"

// Grommet Stuff
import grommetTheme from "./themes/theme.json";
import { Box, Button, Heading, Grommet } from "grommet";
import { Menu } from 'grommet-icons';

/*const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "INFURA_ID", // required
        },
    },
};*/

/*
const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
});
*/


// const provider = web3Modal.connect();

// const web3 = new Web3(provider);

const AppBar = (props) => (
    <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="green"
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        style={{ zIndex: '1' }}
        {...props}
    />
);

function loginFunction () {
    alert("let me in!")
}

function App() {
    const [ showSidebar, setShowSidebar ] = useState(true);

    return (
        <Grommet theme={grommetTheme} full>
            <Box fill>
                <AppBar>
                    <Heading level="3" margin="none">xSurge</Heading>
                    <Button
                        icon={<Menu/>}
                        onClick={() => setShowSidebar(!showSidebar)}
                    />
                </AppBar>
                <Box direction="row" flex overflow={{ horizontal: 'hidden' }} fill>
                    <Box flex align="center" justify="center" background="spaceBlue">
                        <Trade/>
                    </Box>
                    {showSidebar && (
                        <Box
                            width="small"
                            background="white"
                            elevation="small"
                            align="center"
                            justify="center"
                        >
                            <Button
                                onClick={loginFunction}
                            >Login</Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Grommet>
    );
}

export default App;
