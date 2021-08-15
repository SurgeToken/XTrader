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
} from "grommet";
import React, {useEffect, useState} from "react";
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

const BuyForm = (props) => {
    const [amount, setAmount] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");
    const [selectedToken, setSelectedToken] = useState(props.defaultToken || Contracts.SurgeBnb);
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

        if (props.onTokenChange) {
            props.onTokenChange(token);
        }
    };

    const onTokenSliderChange = (value) => {
        const percentage = (value || 0) / 100;
        const calculatedAmount = percentage * props.tokenBalance;
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

    return (
        <Box align={"center"} pad={(size === "small" ? "xlarge" : "medium")} small round>
            <Box gap={"medium"}>
                <Box gap={"small"}>
                    <Text>Token</Text>
                    <TokenSelector onSelect={onSelectedTokenChange} defaultToken={selectedToken}/>
                </Box>
                <Box gap={"small"}>
                    <Text>Quantity</Text>
                    <TextInput
                        value={amount}
                        onChange={onAmountChange}
                    />
                    <FormFieldError message={amountErrorMessage}/>
                </Box>
                <Box gap={"small"}>
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
    const [amount, setAmount] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");
    const [selectedToken, setSelectedToken] = useState(props.defaultToken || Contracts.SurgeBnb);
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

        if (props.onTokenChange) {
            props.onTokenChange(token);
        }
    };

    const onTokenSliderChange = (value) => {
        const percentage = (value || 0) / 100;
        const calculatedAmount = percentage * props.tokenBalance;
        setAmount(calculatedAmount);
    };

    const sellTokens = async () => {
        if (!amountValid) {
            return;
        }

        // const result = await sell(selectedToken, amount);

        // console.log('Transaction result', result);
    };

    return (
        <Box align={"center"} pad={(size === "small" ? "xlarge" : "medium")} small round>
            <Box gap={"medium"}>
                <Box gap={"small"}>
                    <Text>Token</Text>
                    <TokenSelector onSelect={onSelectedTokenChange} defaultToken={selectedToken}/>
                </Box>
                <Box gap={"small"}>
                    <Text>BNB</Text>
                    <TextInput
                        value={amount}
                        onChange={onAmountChange}
                    />
                    <FormFieldError message={amountErrorMessage}/>
                </Box>
                <Box gap={"small"}>
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

const Trader = (props) => {
    const {wallet} = props;
    const [action, setAction] = React.useState(0);
    const [currentTokenBalance, setCurrentTokenBalance] = useState(0);
    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);

    useEffect(() => {
        (async () => {
            // Update the initial token balance
            const balance = await getTokenBalance(Contracts.SurgeBnb);
            setCurrentTokenBalance(balance);
        })();
    }, []);

    const onTokenChange = async (token) => {
        // Update the token balance after changing the selected token
        const balance = getTokenBalance(token);
        setCurrentTokenBalance(balance);
    };

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
                            >Trade</Text>
                        </Box>
                        <Box
                            align={"center"}
                            justify={"end"}
                            direction={"row"}
                            gap={"medium"}
                            pad={{left: "medium"}}
                            margin={(size === "xsmall" ? "medium" : "small")}
                        >
                            <Anchor onClick={() => setAction(true)} color="white">
                                <Button label="Buy" plain={!action}/>
                            </Anchor>
                            <Anchor onClick={() => setAction(false)} color="white">
                                <Button label="Sell" plain={!!action}/>
                            </Anchor>
                        </Box>
                    </CardHeader>
                    <CardBody>
                        {action ? <BuyForm
                            onTokenChange={onTokenChange}
                            tokenBalance={currentTokenBalance}
                            defaultToken={Contracts.SurgeBnb}
                        /> : <SellForm
                            onTokenChange={onTokenChange}
                            tokenBalance={currentTokenBalance}
                            defaultToken={Contracts.SurgeBnb}
                        />}
                    </CardBody>
                </Card>
            </Draggable>

    );
}

export default Trader;