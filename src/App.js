// Libs
import React, { useEffect } from "react";

// Components
import Trade from "./components/NativeSurgeTrader"

// Grommet Stuff
import grommetTheme from "./themes/theme.json";

import {Box, Button, Grommet, ResponsiveContext} from "grommet";
import {Add} from 'grommet-icons';

// Styles
import './App.css';

// Assets
import logo from './assets/xsurge-logo.png';

// Common Functions
import {connectWallet} from "./common/walletConnect"

const AppBar = (props) => (
    <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="spaceBlue"
        pad={{left: 'medium', right: 'small', vertical: 'small'}}
        style={{zIndex: '1'}}
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
            try {
                await connectWallet();
            } catch (err) {
                console.log("Failed to connect wallet", err);
                return;
            }
        })();
    }, []);

    return (
        <Grommet theme={grommetTheme} full>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <AppBar>
                            <div>
                                <a href="/"><img src={logo} alt="Logo" height={size === 'medium' ? "25px" : "20px"}/></a>
                            </div>
                            <div>
                                <Button
                                    size="medium"
                                    onClick={walletConnect}
                                    label={size === 'medium' ? "Connect Wallet" : "Wallet"}
                                />
                                <Button
                                    secondary
                                    size="small"
                                    alignSelf="end"
                                    icon={<Add color="white"/>}
                                    plain
                                    style={ (size === 'small') ? {marginLeft: 12, marginRight: 12} : {marginLeft: 20, marginRight: 15}}
                                    onClick={addTradingComponent}
                                />
                            </div>
                        </AppBar>
                        <Box direction="row" flex overflow={{horizontal: 'hidden'}} fill className="appBody">
                            <Box flex align="center" justify="center">
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
