
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
export default function Staker(){
    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);
    const [uselessBalance, ] = useRecoilState(state.uselessBalance)
    const [amount, setAmount] = useState(0);
    const [displayAmount, setDisplayAmount] = useState(0);
    // const [underlyingAssetBalance, setUnderlyingAssetBalance] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");

    const onAmountChange = (event) => {
        console.log("=>onAmountChange")
        const errorMessage = validateAmount(event.target.value);

        if (errorMessage) {
            setAmount(0);
            setAmountValid(false);
            setAmountErrorMessage(errorMessage);
            return;
        }
        console.error(amountValid)
        console.error(errorMessage)
        console.error((event.target))
        console.error(parseFloat(event.target.value))
        // setAmount( mathamount > uselessBalance.math ? uselessBalance.math : mathamount);
        // setDisplayAmount(event.target.value)
        const amount = event.target.value
        setAmount(event.target.value);
        setAmountValid(true);
        setAmountErrorMessage("");
    };
    const onTokenSliderChange = (percentage) => {
        console.log("=>onTokenSliderChange")

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
    return (
        <Card
            // height={"large"}
            small
            round
            pad={{bottom:"large"}}
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
                <Text pad={{bottom: "small"}}>Staker</Text>
            </CardHeader>
            {
                uselessBalance ?
            <CardBody pad={"xxlarge"}>
                <Text>Balance: {Web3.utils.fromWei(Web3.utils.toBN(uselessBalance.math), 'Gwei')} Useless</Text>
                {/*<Text>Balance: {uselessBalance / Math.pow(10, 9)} Useless</Text>*/}

                <TextInput
                    type={"number"}
                    value={amount}
                    // value={amount / Math.pow(10, 9)}
                    onChange={onAmountChange}
                    // afterChange{amountChanged}
                />
                <Box gap={"small"} align={"center"}>
                    <TokenAmountSlider onValueChange={onTokenSliderChange} defaultValue={0}/>
                </Box>
                <Box direction="row" gap="medium" margin={"small"}>
                    {/*<Button type="reset" label="Clear" size={"large"}/>*/}
                    <StakeButton type="submit" label="Accept" size={"large"} asset={"SUSLS"} amount={Web3.utils.toBN(amount*10**9)} validAmount={amountValid} primary/>
                </Box>
            </CardBody>
                    : ""
            }
        </Card>
    );
}