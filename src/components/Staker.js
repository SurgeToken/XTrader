
import React, {useContext, useEffect, useState} from "react";
import FormFieldError from "./FormFieldError/FormFieldError";

import contracts from "../contracts/contracts";

import TokenAmountSlider from "./TokenAmountSlider";

import state from "../state/state";
import {useRecoilState} from "recoil";

import {WalletContext} from "../context/context";
import {Box, Card, CardBody, CardHeader, ResponsiveContext, Text, TextInput} from "grommet";
import Token from "../contracts/Token";
import uselessABI from "../contracts/abi/useless.json";
import StakeButton from "./StakeButton";
import Web3 from "web3";
import {Time} from "grommet-icons";
import {getHistoricPriceData} from "../common/price";

const toHex = (amount) => {
    return '0x' + amount.toString(16)
};

function validateAmount(amount) {
    if (isNaN(parseFloat(amount))) {
        return "Amount is not a number"
    }

    if (Number(amount) <= 0) {
        return "Amount must be greater than 0"
    }
    //
    // if (Number(amount) > balance) {
    //     return "Amount cannot be greater than available balance"
    // }

    return ""
}
// function convertMs(ms) {
//     const days = Math.floor(ms / (24 * 60 * 60 * 1000));
//
//     ms %= (24 * 60 * 60 * 1000);
//     const hours = Math.floor(ms / (60 * 60 * 1000));
//
//     ms %= (60 * 60 * 1000);
//     const minutes = Math.floor(ms / (60 * 1000));
//
//     ms %= (60 * 1000);
//     const seconds = Math.floor(ms / (1000));
//     console.log({days: days, hours:hours, minutes:minutes, seconds:seconds})
//     return {days: days, hours:hours, minutes:minutes, seconds:seconds}
// }
// async function launch(setTimeLeft) {
//     const stakeLaunch = new Date(new Date(2021, 9, 3, 21,0,0,0).toUTCString())
//     let timeNow = new Date(new Date().toUTCString())
//     console.log(stakeLaunch, timeNow)
//
//     let timeDiff = stakeLaunch.getTime() - timeNow.getTime()
//     setTimeLeft({ms: timeDiff, formatted: convertMs(timeDiff)})
// }
export default function Staker({timeLeft}){
    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);
    const [uselessBalance, ] = useRecoilState(state.uselessBalance)
    const [amount, setAmount] = useState(0);
    const [displayAmount, setDisplayAmount] = useState(0);
    // const [underlyingAssetBalance, setUnderlyingAssetBalance] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");
    // const [timeLeft, setTimeLeft] = useState(1);
    // useEffect(()=>{
    //     launch(setTimeLeft)
    // }, [timeLeft])
    // launch(setTimeLeft).then()
    // setInterval(launch.bind(this, setTimeLeft), 5*1000);
    const onAmountChange = (event) => {
        const errorMessage = validateAmount(event.target.value);

        if (errorMessage) {
            setAmount(0);
            setAmountValid(false);
            setAmountErrorMessage(errorMessage);
            return;
        }
        // setAmount( mathamount > uselessBalance.math ? uselessBalance.math : mathamount);
        // setDisplayAmount(event.target.value)
        const amount = event.target.value
        setAmount(event.target.value);
        setAmountValid(true);
        setAmountErrorMessage("");
    };
    const onTokenSliderChange = (percentage) => {

        const calculatedAmount = (percentage * uselessBalance.math) / 100;
        const errorMessage = validateAmount(calculatedAmount);

        if (errorMessage) {
            setAmount(0);
            setAmountValid(false);
            setAmountErrorMessage(errorMessage);
            return;
        }
        setAmount(Web3.utils.fromWei(Web3.utils.toBN(calculatedAmount), 'Gwei'));
        // setAmount(calculatedAmount > uselessBalance.math ? uselessBalance.math : calculatedAmount);
        setDisplayAmount(Web3.utils.fromWei(Web3.utils.toBN(calculatedAmount), 'Gwei'));
    };
    // if (timeLeft.ms > 0) {
    //     return (
    //         <Card
    //
    //             align={"center"}
    //             // height={"large"}
    //             small
    //             round
    //             // pad={{bottom:"large"}}
    //             background={"spaceBlue"}
    //             elevation={"large"}
    //             style={{border: "solid 1px #21BBB1"}}>
    //             <CardHeader
    //
    //                 flex={"shrink"}
    //                 // direction={"column"}
    //                 align={"center"}
    //                 direction={(size === "xsmall" ? "column" : "row")}
    //                 justify={(size === "xsmall" ? "evenly" : "between")}
    //                 gap={"none"}
    //                 pad={{top: "small", bottom: "small", right: "medium", left: "medium"}}
    //                 margin={(size === "xsmall" ? "medium" : "small")}
    //             ><Text>Staker</Text>
    //
    //             </CardHeader>
    //             <CardBody pad={"xxlarge"}>
    //                 <Text pad={{top: "small", bottom: "large", right: "medium", left: "medium"}}>
    //                     Time until Launch {timeLeft.formatted.days > 0 ? timeLeft.formatted.days+" Days" : ""} {timeLeft.formatted.hours > 0 ? timeLeft.formatted.hours+" Hours" : ""} {timeLeft.formatted.minutes > 0 ? timeLeft.formatted.minutes+" Minutes" : ""} {timeLeft.formatted.seconds > 0 ? timeLeft.formatted.seconds+" Seconds" : ""}
    //                 </Text>
    //             </CardBody>
    //         </Card>
    //     )
    // } else {
        return (


            <Card

                align={"center"}
                // height={"large"}
                small
                round
                // pad={{bottom:"large"}}
                background={"spaceBlue"}
                elevation={"large"}
                style={{border: "solid 1px #21BBB1"}}>
                <CardHeader

                    flex={"shrink"}
                    // direction={"column"}
                    align={"center"}
                    direction={(size === "xsmall" ? "column" : "row")}
                    justify={(size === "xsmall" ? "evenly" : "between")}
                    gap={"none"}
                    pad={{top: "small", bottom: "small", right: "medium", left: "medium"}}
                    margin={(size === "xsmall" ? "medium" : "small")}
                >

                    <Text>Staker</Text>


                </CardHeader>
                {
                    uselessBalance ?
                        <CardBody pad={"xxlarge"}>
                            <Text margin={{
                                bottom: "medium",
                                top: "small"
                            }}>Balance: {Web3.utils.fromWei(Web3.utils.toBN(uselessBalance.math), 'Gwei')} Useless</Text>
                            {/*<Text>Balance: {uselessBalance / Math.pow(10, 9)} Useless</Text>*/}

                            <TextInput
                                type={"number"}
                                value={amount}
                                // value={amount / Math.pow(10, 9)}
                                onChange={onAmountChange}
                                // afterChange{amountChanged}
                            />
                            <Box margin={{bottom: "small", top: "medium"}} gap={"small"} align={"center"}>
                                <TokenAmountSlider onValueChange={onTokenSliderChange} defaultValue={0}/>
                            </Box>
                            <Box gap="medium" margin={"small"} align={"center"}>
                                {/*<Button type="reset" label="Clear" size={"large"}/>*/}
                                <StakeButton type="submit" label="Accept" size={"large"} asset={"SUSLS"}
                                             amount={Web3.utils.toBN((amount * 10 ** 9).toString(16))} primary/>
                            </Box>
                        </CardBody>
                        : ""
                }
            </Card>
        );
    // }
}