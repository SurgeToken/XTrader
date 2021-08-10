// Libs
import React, {useEffect, useState} from "react";

// Components
import Trade from "./components/NativeSurgeTrader"

// Grommet Stuff
import grommetTheme from "./themes/theme.json";
import { Box, Button, Heading, Grommet } from "grommet";
import { Menu } from 'grommet-icons';

// Common Functions
import {connectWallet} from "./common/walletConnect"

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

async function walletConnect () {
    await connectWallet();
}

function App() {
    const [ showSidebar, setShowSidebar ] = useState(true);

    useEffect(() => {
        (async () => {
            await connectWallet();
        })();
    }, []);

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
                        </Box>
                    )}
                </Box>
            </Box>
        </Grommet>
    );
}

export default App;
