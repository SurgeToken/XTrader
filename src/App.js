// Libs
import React, {useEffect, useState} from "react";

// Components
import Trade from "./components/NativeSurgeTrader"

// Grommet Stuff
import grommetTheme from "./themes/theme.json";
import { Box, Button, Collapsible, Heading, Grommet, Layer, ResponsiveContext } from "grommet";
import { Menu, Add, FormClose } from 'grommet-icons';

// Styles
import './App.css';

// Common Functions
import {connectWallet} from "./common/walletConnect"

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

const Sidebar = () => (
    <Box
        flex
        width="small"
        background="white"
        justify="start"
    >
        <Button
            alignSelf="end"
            className=""
            icon={<Add/>}
            onClick={addTradingComponent}
        />
        <Button
            margin="small"
            onClick={walletConnect}
        >Wallet connect</Button>
    </Box>
);

function addTradingComponent() {
    alert('Add another trading component to the body');
}

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
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <AppBar>
                            <Heading level="3" margin="none">xSurge</Heading>
                            <Button
                                icon={<Menu/>}
                                onClick={() => setShowSidebar(!showSidebar)}
                            />
                        </AppBar>
                        <Box direction="row" flex overflow={{ horizontal: 'hidden' }} fill className="appBody">
                            <Box flex align="center" justify="center" background="spaceBlue">
                                <Box flex="shrink" height={{ min: "48px" }} width={{ min: "48px" }}
                                     background="spaceBlue" className="appBodyToolbar">

                                </Box>
                                <Trade/>
                            </Box>
                            {(!showSidebar || size !== 'small') ? (
                                <Collapsible direction="horizontal" open={showSidebar}>
                                    <Sidebar/>
                                </Collapsible>
                            ) : (
                                <Layer>
                                    <Box
                                        background="white"
                                        tag="header"
                                        justify="end"
                                        align="center"
                                        direction="row"
                                    >
                                        <Button
                                            icon={<FormClose/>}
                                            onClick={() => setShowSidebar(false)}
                                        />
                                    </Box>
                                    <Box
                                        fill
                                        background="white"
                                        align="center"
                                        justify="center"
                                    >
                                        <Sidebar/>
                                    </Box>
                                </Layer>
                            )}
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
}

export default App;
