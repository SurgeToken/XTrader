// Libs
import React, { useState } from "react";

// Components
import Trade from "./components/NativeSurgeTrader"

// Grommet Stuff
import grommetTheme from "./themes/theme.json";
import { Box, Button, Heading, Grommet } from "grommet";
import { Menu } from 'grommet-icons';

// Common Functions
import {connectWallet} from "./common/walletConnect"
import {connectMetamask} from "./common/metamask"
import { buy } from "./common/trade";
import { Contracts } from "./common/contracts";

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

function walletConnect () {
    connectWallet();
}

async function metaMask()  {
    await connectMetamask();
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
                                onClick={walletConnect}
                            >Login Wallet connect</Button>
                            <Button
                                onClick={metaMask}
                            >Login Metamask</Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Grommet>
    );
}

export default App;
