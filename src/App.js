// Libs
import React, {useContext, useEffect, useState} from "react";

// Components

import XPriceChart from "./components/XPriceChart";
import Bridge from "./components/Bridge";
import Assets from "./components/Assets";
import Staker from "./components/Staker";
import SurgeFund from "./components/SurgeFund";

import CacheBuster from './CacheBuster';

import Wallet from "./common/wallet";
import state from "./state/state"
// Grommet Stuff
import grommetTheme from "./themes/theme.json";

import {Box, Button, Grommet,Text, ResponsiveContext} from "grommet";
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

// function convertMs(ms) {
//     console.log({days: days, hours:hours, minutes:minutes, seconds:seconds})
//     return {days: days, hours:hours, minutes:minutes, seconds:seconds}
// }
function launch(setTimeLeft, launchTime) {
    let timerFinished = false
    // let timeNow = new Date(new Date().toUTCString())
    // console.log(launchTime, timeNow)
    if (!timerFinished) {
        let timeDiff = launchTime - Date.now();
        // if (timeDiff > 0) {
            let ms = timeDiff
            const days = Math.floor(ms / (24 * 60 * 60 * 1000));

            ms %= (24 * 60 * 60 * 1000);
            const hours = Math.floor(ms / (60 * 60 * 1000));

            ms %= (60 * 60 * 1000);
            const minutes = Math.floor(ms / (60 * 1000));

            ms %= (60 * 1000);
            const seconds = Math.floor(ms / (1000));
            console.log({days: days, hours: hours, minutes: minutes, seconds: seconds})
            setTimeLeft({ms: timeDiff, formatted: {days: days, hours: hours, minutes: minutes, seconds: seconds}})
        // }
    timerFinished = timeDiff <= 0
    }
}
// function startTimer(setTimeLeft) {
//     launch(setTimeLeft)
// //     setInterval(() => {
// //         launch(setTimeLeft)
// //     }, 5*1000)
// }

function Main() {
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1,
        456: 1
    };
    const [timeLeft, setTimeLeft] = useState(1);
  
    // const launchTime = Date.UTC(2021, 9, 3, 19, 0, 0, 0);
    //
    // useEffect(() => {
    //     setTimeout(() => {
    //         launch(setTimeLeft, launchTime)
    //     }, 1000)
    // }, [timeLeft])

    const context = useContext(WalletContext);
    const [connected, setConnected] = useRecoilState(state.walletConnected);
    const [, setHoldings] = useRecoilState(state.walletHoldings);
    const [, setPrices] = useRecoilState(state.contractPrices);
    const [, setRelPricesBNB] = useRecoilState(state.relPricesBNB);
    const [, setRelPricesBUSD] = useRecoilState(state.relPricesBUSD);
    const [, setHoldingValues] = useRecoilState(state.walletHoldingValues);
    const [, setTimeTillClaim] = useRecoilState(state.walletFundsTimeTillClaim);
    const [, setClaimableBNB] = useRecoilState(state.walletFundsClaimableBNB);
    const [, setUselessBalance] = useRecoilState(state.uselessBalance);
    const [account, setAccount] = useRecoilState(state.walletAccount);
    // eslint-disable-next-line no-unused-vars
    const [contracts, setContracts] = useRecoilState(state.contracts);
    const [, setContractFees] = useRecoilState(state.contractFees);
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
            const newPrices = {...userWallet.prices};
            setPrices(newPrices);
            if (!context.provider) {
                context.provider = userWallet.provider;
            }
        },
        () => {
            const newVal = {...userWallet.relPricesBNB};
            setRelPricesBNB(newVal);
            // setRelPricesBNB({...userWallet.relPricesBNB});
            if (!context.provider) {
                context.provider = userWallet.provider;
            }
        },
        () => {
            const newVal = {...userWallet.relPricesBUSD};
            setRelPricesBUSD(newVal);
            if (!context.provider) {
                context.provider = userWallet.provider;
            }
        },
        () => {
            const newUselessBalance = {...userWallet.uselessBalance};
            setUselessBalance(newUselessBalance);
            if (!context.provider) {
                context.provider = userWallet.provider;
            }
        },
        () => {
            setContracts(Object.keys(userWallet.contracts));
            setContractFees(userWallet.contractFees);
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
                        <AppBar style={{color: 'black'}} background={{color: "yellow", opacity: "light"}}>
                            <Box textAlign={"center"}>
                            <Text textAlign={"center"}>
                                xUSD is only available on our V2 beta dApp. Visit this link! <a href="https://appv2.xsurge.net">https://appv2.xsurge.net</a>
                            </Text>
                            </Box>
                        </AppBar>
                            <Box
                                fill
                                className="appBody"
                                overflow={{vertical: 'auto'}}
                                pad={"medium"}
                                align={"center"}
                            >
                                <Masonry
                                    breakpointCols={breakpointColumnsObj}
                                    className="my-masonry-grid"
                                    columnClassName="my-masonry-grid_column"
                                >
                                    <Box ><Staker/></Box>
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
