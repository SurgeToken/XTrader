// Libs
import React, {useContext, useState} from "react";
import Masonry from 'react-masonry-css';

// Components
import XPriceChart from "./components/XPriceChart";
import Bridge from "./components/Bridge";
import Assets from "./components/Assets";
import Chart from "./components/Chart";
import Wallet from "./common/wallet";
import state from "./state/state"
// Grommet Stuff
import grommetTheme from "./themes/theme.json";

import {Box, Button, Grommet, ResponsiveContext} from "grommet";
import {Add} from 'grommet-icons';

// Styles
import './App.css';

// Assets
import logo from './assets/xsurge-logo.png';

// Common Functions
import {RecoilRoot, useRecoilState} from "recoil";
import {WalletContext} from "./context/context";

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

function Main() {
    const breakpointColumnsObj = {
        default: 2,
        768: 1
    };
    const context = useContext(WalletContext);
    const [connected, setConnected] = useRecoilState(state.walletConnected);
    const [, setHoldings] = useRecoilState(state.walletHoldings);
    const [, setHoldingValues] = useRecoilState(state.walletHoldingValues);
    const [account, setAccount] = useRecoilState(state.walletAccount);
    const [contracts, setContracts] = useRecoilState(state.contracts);
    const userWallet = new Wallet((key, value) => {
            const newHoldings = {...userWallet.holdings};
            setHoldings(newHoldings);
            if (!context.provider) {
                context.provider = userWallet.provider;
            }
        },
        () => {
            const newHoldingValues = {...userWallet.holdingValues};
            setHoldingValues(newHoldingValues);
            if (!context.provider) {
                context.provider = userWallet.provider;
            }
        },
        () => {
            setContracts(Object.keys(userWallet.contracts));
            setAccount(userWallet.accountAddress);
            context.wallet = userWallet;
            setConnected(true);
        },
        () => {
            setConnected(false);
        });
    return (
        <Grommet  theme={grommetTheme} full>
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
                                    onClick={() => connected? userWallet.disconnect() : userWallet.connect()}
                                    label={connected ? account.slice(0, 4) + '...' + account.slice(38) : (size === "xsmall" ? "Wallet" : "Connect Wallet")}
                                />
                            </Box>
                        </AppBar>
                        <Box
                            fill
                            className="appBody"
                            overflow={{horizontal: 'hidden'}}
                            pad={"medium"}
                            align={"center"}
                        >
                                <Box align={"center"}><Bridge/></Box>
                                <Box align={"center"}><Assets/></Box>
                                <Box align={"center"}><XPriceChart/></Box>
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
    )
}


function App() {

    return (
        <RecoilRoot>
            <Main/>
        </RecoilRoot>
    );
}

export default App;
