import {
    Box,
    Button,
    TextInput,
    ResponsiveContext,
    Card,
    CardBody,
    Anchor,
    CardHeader,
    Text,
    RangeInput
} from "grommet";
import React, {useContext, useEffect, useState} from "react";
import FormFieldError from "./FormFieldError/FormFieldError";
// import {buy, sell} from "../common/trade";
import {Contracts} from "../common/contracts";
import TokenSelector from "./TokenSelector/TokenSelector";
import TokenAmountSlider from "./TokenAmountSlider";
// import {getAccount, getSurgeBalance} from "../common/wallet";
import Draggable from 'react-draggable';
import SurgeToken from "../contracts/SurgeToken";
import XBridge from "../contracts/XBridge";
import XBridgeManager from "../contracts/XBridgeManager";
import wallet from "./Wallet";
import {useRecoilState} from "recoil";
import {selectedTokenState} from "../state/state";


function validateAmount(amount) {
    if (isNaN(parseFloat(amount))) {
        return "Amount is not a number"
    }

    if (Number(amount) <= 0) {
        return "Amount must be greater than 0"
    }

    return ""
}

async function getTokenBalance(contract) {
    // const address = await getAccount();
    // return getSurgeBalance(contract, address);
}


function buy() {

}

const BuyForm = (props) => {
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('BNB');
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");

    const [holdings, setHoldings] = useRecoilState(wallet.holdings);
    const [selectedToken, setSelectedToken] = useRecoilState(selectedTokenState);

    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);


    const onAmountChange = (event) => {
        const errorMessage = validateAmount(event.target.value);

        if (errorMessage) {
            setAmount(0);
            setAmountValid(false);
            setAmountErrorMessage(errorMessage);
            return;
        }

        setAmount(parseFloat(event.target.value));
        setAmountValid(true);
        setAmountErrorMessage("");
    };

    const onSelectedTokenChange = (token) => {
        setSelectedToken(token);
        setCurrency(token.buyCurrency);
    };

    const onTokenSliderChange = (value) => {
        const balance = holdings[currency] || 0;
        const percentage = value / 100;
        const calculatedAmount = percentage * (balance * 1.0e-18).toFixed(4);
        setAmount(calculatedAmount);
    };

    const buyTokens = async () => {
        if (!amountValid) {
            return;
        }

        // const result = await buy(selectedToken, amount);
        //
        // console.log('Transaction result', result);
    };
    const balance = (parseInt(holdings[currency] || 0) * 1.0e-18).toFixed(4);
    return (
        <Box align={"center"} pad={(size === "small" ? "xlarge" : "medium")} small round>
            <Box gap={"medium"}>
                <Box gap={"small"}>
                    <Text>Token</Text>
                    <TokenSelector onSelect={onSelectedTokenChange} defaultToken={selectedToken}/>
                </Box>
                <Box gap={"small"}>
                    <Box direction={"row"} justify={"between"}>
                        <Text >{currency}</Text>
                        <Text>Balance: {balance}</Text>
                    </Box>
                    <TextInput
                        value={amount}
                        onChange={onAmountChange}
                    />
                    <FormFieldError message={amountErrorMessage}/>
                </Box>
                <Box gap={"small"} align={"center"}>
                    <TokenAmountSlider onValueChange={onTokenSliderChange} defaultValue={0}/>
                </Box>
            </Box>
            <Box direction="row" gap="medium" margin={"small"}>
                <Button type="reset" label="Clear" size={"large"}/>
                <Button type="submit" label="Accept" size={"large"} onClick={buyTokens} primary/>
            </Box>
        </Box>
    )
}

const SellForm = (props) => {
    const [holdings, setHoldings] = useRecoilState(wallet.holdings);
    const [currency, setCurrency] = useState('SURGE');
    const [amount, setAmount] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");

    const [selectedToken, setSelectedToken] = useRecoilState(selectedTokenState);

    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);

    const onAmountChange = (event) => {
        const errorMessage = validateAmount(event.target.value);

        if (errorMessage) {
            setAmount(0);
            setAmountValid(false);
            setAmountErrorMessage(errorMessage);
            return;
        }

        setAmount(parseFloat(event.target.value));
        setAmountValid(true);
        setAmountErrorMessage("");
    };

    const onSelectedTokenChange = (token) => {
        setSelectedToken(token);
        setCurrency(token.name);
    };

    const onTokenSliderChange = (value) => {
        const balance = holdings[selectedToken.name] || 0;
        const percentage = value / 100;
        const calculatedAmount = percentage * (balance * 1.0e-18).toFixed(4);
        setAmount(calculatedAmount);
    };

    const sellTokens = async () => {
        if (!amountValid) {
            return;
        }

        // const result = await sell(selectedToken, amount);

        // console.log('Transaction result', result);
    };
    const balance = parseInt(holdings[currency] || 0);
    console.log('Holdings', holdings);
    return (
        <Box align={"center"} pad={(size === "small" ? "xlarge" : "medium")} small round>
            <Box gap={"medium"}>
                <Box gap={"small"}>
                    <Box direction={"row"} justify={"between"}>
                        <Text >Token</Text>
                        <Text>Balance: {balance}</Text>
                    </Box>
                    <TokenSelector onSelect={onSelectedTokenChange} defaultToken={selectedToken}/>
                </Box>
                <Box gap={"small"}>
                    <Box direction={"row"} justify={"between"}>
                        <Text>{currency}</Text>
                        <Text>Received: 000</Text>
                    </Box>
                    <TextInput
                        value={amount}
                        onChange={onAmountChange}
                    />
                    <FormFieldError message={amountErrorMessage}/>
                </Box>
                <Box gap={"small"} align={"center"}>
                    <TokenAmountSlider onValueChange={onTokenSliderChange} defaultValue={0}/>
                </Box>
            </Box>
            <Box direction="row" gap="medium" margin={"small"}>
                <Button type="reset" label="Clear" size={"large"}/>
                <Button type="submit" label="Accept" size={"large"} onClick={sellTokens} primary/>
            </Box>
        </Box>
    )
}

// TODO selling and buying forms need to be a generic form component
const BridgeForm = (props) => {

}

const Bridge = (props) => {
    const [action, setAction] = React.useState(0);
    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);

    return (
            <Draggable disabled={true}>
                <Card
                      small round
                      background={"spaceBlue"}
                      elevation={"large"}
                      style={{border: "solid 1px #21BBB1"}}>
                    <CardHeader
                        flex={"shrink"}
                        direction={(size === "xsmall" ? "column" : "row")}
                        justify={(size === "xsmall" ? "evenly" : "between")}
                        gap={"none"}
                        pad={{top: "small", bottom: "small", right: "medium", left: "medium"}}
                    >
                        <Box margin={(size === "xsmall" ? "medium" : "small")}>
                            <Text
                                size={((size === "xsmall" || size === "small") ? "large" : "large")}
                            >XBridge</Text>
                        </Box>
                        <Box
                            align={"center"}
                            justify={"end"}
                            direction={"row"}
                            gap={"medium"}
                            pad={{left: "medium"}}
                            margin={(size === "xsmall" ? "medium" : "small")}
                        >
                            <Anchor onClick={() => setAction(false)} color="white">
                                <Button label="Buy" plain={action}/>
                            </Anchor>
                            <Anchor onClick={() => setAction(true)} color="white">
                                <Button label="Sell" plain={!action}/>
                            </Anchor>
                        </Box>
                    </CardHeader>
                    <CardBody>
                        {!action ? <BuyForm
                            defaultToken={Contracts.SurgeBnb}
                        /> : <SellForm
                            defaultToken={Contracts.SurgeBnb}
                        />}
                    </CardBody>
                </Card>
            </Draggable>

    );
}

export default Bridge;
