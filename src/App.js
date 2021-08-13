// Libs
import React, { useEffect } from "react";

// Components
import Trade from "./components/NativeSurgeTrader"
import WalletButton from "./components/Wallet";

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
        pad={{left: 'medium', right: 'medium', vertical: 'medium'}}
        style={{zIndex: '1'}}
        {...props}
    />
);

function addTradingComponent() {
    alert('Add another trading component to the body');
}

function App() {
    useEffect(() => {
    }, []);

    return (
        <Grommet theme={grommetTheme} full>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <AppBar>
                            <Box>
                                <a href="/"><img src={logo} alt="Logo" height={size === 'medium' ? "25px" : "20px"}/></a>
                            </Box>
                            <Box>
                                <WalletButton/>
                            </Box>
                        </AppBar>
                        <Box direction="row" flex overflow={{horizontal: 'scroll'}} fill className="appBody" pad={"medium"}>
                            <Box flex align="center" justify="center">
                                <Trade/>
                            </Box>
                        </Box>
                        <Box pad={"medium"}>
                            <Button
                                secondary
                                size="small"
                                alignSelf="end"
                                icon={<Add color="white"/>}
                                plain
                                style={ (size === 'small') ? {marginLeft: 12, marginRight: 12} : {marginLeft: 20, marginRight: 15}}
                                onClick={addTradingComponent}
                            />
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
}

export default App;
