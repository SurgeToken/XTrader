// Libs
import React from "react";
import Masonry from 'react-masonry-css';

// Components
import Trader from "./components/Trader"
import WalletButton from "./components/Wallet";
import Assets from "./components/Assets";

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
import XPriceChart from "./components/XPriceChart";

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
    const breakpointColumnsObj = {
        default: 2,
        768: 1
    };

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
                        <Box
                            fill
                            className="appBody"
                            overflow={{horizontal: 'hidden'}}
                            pad={"medium"}
                        >
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                            >
                                <Box align={"center"}><Trader/></Box>
                                <Box align={"center"}><Assets/></Box>
                                <Box align={"center"}><XPriceChart/></Box>
                            </Masonry>
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
