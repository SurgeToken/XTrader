// Libs
import React, {useContext} from "react";

// Components

import XPriceChart from "./components/XPriceChart";
import Bridge from "./components/Bridge";
import Assets from "./components/Assets";
import SurgeFund from "./components/SurgeFund";
import Chart from "./components/Chart";

import CacheBuster from './CacheBuster';

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
import Masonry from "react-masonry-css";

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
    const [, setTimeTillClaim] = useRecoilState(state.walletFundsTimeTillClaim);
    const [, setClaimableBNB] = useRecoilState(state.walletFundsClaimableBNB);
    const [account, setAccount] = useRecoilState(state.walletAccount);
    // eslint-disable-next-line no-unused-vars
    const [contracts, setContracts] = useRecoilState(state.contracts);
    const userWallet = new Wallet(() => {
            const timeTillClaim = userWallet.timeTillClaim;
            setTimeTillClaim(timeTillClaim);
            if (!context.provider) {
                context.provider = userWallet.provider;
            }
        },() => {
            const claimableBNB = userWallet.claimableBNB;
            setClaimableBNB(claimableBNB);
            if (!context.provider) {
                context.provider = userWallet.provider;
            }
        },() => {
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
                                // overflow={{horizontal: 'hidden'}}
                                pad={"medium"}
                                align={"center"}
                            >
                                <Masonry
                                    breakpointCols={breakpointColumnsObj}
                                    className="my-masonry-grid"
                                    columnClassName="my-masonry-grid_column"
                                >
                                    <Box ><Bridge/></Box>
                                    <Box ><Assets/></Box>
                                    <Box ><XPriceChart/></Box>
                                </Masonry>
                            </Box>
                            <Box pad={"medium"} align={"center"}>
                                <SurgeFund wallet={userWallet} contracts={contracts}/>

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
        <CacheBuster>
            {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                if (loading) return null;
                if (!loading && !isLatestVersion) {
                    refreshCacheAndReload();
                }

                return (
                    <RecoilRoot>
                        <Main/>
                    </RecoilRoot>
                  );
                }}
        </CacheBuster>
    );
}


export default App;
