// Libs
import React, {useState} from "react";
import Masonry from 'react-masonry-css';

// Components
import Trader from "./components/Trader"
import Chart from "./components/Chart";
import Assets from "./components/Assets";
import Wallet from "./common/wallet";
import WalletButton from './components/WalletButton';
// Grommet Stuff
import grommetTheme from "./themes/theme.json";

import {Box, Button, Grommet, ResponsiveContext} from "grommet";
import {Add} from 'grommet-icons';

// Styles
import './App.css';

// Assets
import logo from './assets/xsurge-logo.png';

// Common Functions
import XPriceChart from "./components/XPriceChart";
import Bridge from "./components/Bridge";

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
    const [account, setAccount] = useState(0);
    const [connected, setConnected] = useState(0);
    const [holdings, setHoldings] = useState({});
    const wallet = new Wallet((key, value) => {
            holdings[key] = value;
            console.log('update holdings ', key, value);
            setHoldings(holdings);
        },
        () => setConnected(true), () => setConnected(false));
    const connect = async () => {
        if (connected) {
            await wallet.disconnect();
            setConnected(false);
        } else {
            await wallet.connect();
            setConnected(true);
            const currentAccount = await wallet.account();
            setAccount(currentAccount.slice(0, 4) + '...' + currentAccount.slice(38));
        }
    }
    return (
        <Grommet theme={grommetTheme} full>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <AppBar>
                            <Box>
                                <a href="/"><img src={logo} alt="Logo"
                                                 height={size === 'medium' ? "25px" : "20px"}/></a>
                            </Box>
                            <Box>
                                <Button
                                    size="medium"
                                    onClick={connect}
                                    label={connected ? account : (size === "xsmall" ? "Wallet" : "Connect Wallet")}
                                />
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
                                <Box align={"center"}><Bridge holdings={holdings} connected={connected}/></Box>
                                {/*<Box align={"center"}><Assets wallet={wallet}/></Box>*/}
                                {/*<Box align={"center"}><XPriceChart wallet={wallet}/></Box>*/}
                            </Masonry>
                        </Box>
                        <Box pad={"medium"}>
                            <Button
                                secondary
                                size="small"
                                alignSelf="end"
                                icon={<Add color="white"/>}
                                plain
                                style={(size === 'small') ? {marginLeft: 12, marginRight: 12} : {
                                    marginLeft: 20,
                                    marginRight: 15
                                }}
                                onClick={addTradingComponent}
                            />
                        </Box>

                        {!connected && <Box style={{position: "absolute"}} onClick={(e) => e.stopPropagation()}
                                            background={{color: "black", opacity: "strong"}} fill/>}
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
}

export default App;
