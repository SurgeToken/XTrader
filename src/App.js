// Libs
import React, { useEffect } from "react";

// Components
import Trade from "./components/NativeSurgeTrader"

// Grommet Stuff
import grommetTheme from "./themes/theme.json";
import { Box, Button, Grommet, ResponsiveContext } from "grommet";
import { Add } from 'grommet-icons';

// Styles
import './App.css';

// Assets
import logo from './assets/xsurge-logo.png';

// Common Functions
import { connectWallet } from "./common/walletConnect"

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

function addTradingComponent() {
    alert('Add another trading component to the body');
}

async function walletConnect() {
    await connectWallet();
}

function App() {
    useEffect(() => {
        (async () => {
            await connectWallet();
        })();
    }, []);

    return (
        <Grommet theme={grommetTheme} full>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <AppBar>
                            <div>
                                <a href="/"><img src={logo} alt="Logo" height="25px"/></a>
                            </div>
                            <div>
                                <Button
                                    primary
                                    size="medium"
                                    onClick={walletConnect}
                                    label="Connect Wallet"
                                />
                                <Button
                                    secondary
                                    size="small"
                                    alignSelf="end"
                                    icon={<Add color="spaceBlue"/>}
                                    onClick={addTradingComponent}
                                />
                            </div>
                        </AppBar>
                        <Box direction="row" flex overflow={{ horizontal: 'hidden' }} fill className="appBody">
                            <Box flex align="center" justify="center" background="spaceBlue">
                                <Box flex="shrink" height={{ min: "48px" }} width={{ min: "48px" }}
                                     background="spaceBlue" className="appBodyToolbar">

                                </Box>
                                <Trade/>
                            </Box>
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
}

export default App;
