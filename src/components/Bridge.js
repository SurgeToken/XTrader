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
import contracts from "../contracts/contracts";
import TokenSelector from "./TokenSelector/TokenSelector";
import TokenAmountSlider from "./TokenAmountSlider";
// import {getAccount, getSurgeBalance} from "../common/wallet";
import Draggable from 'react-draggable';
import state from "../state/state";
import {useRecoilState} from "recoil";
import BuyButton from "./BuyButton";
import {WalletContext} from "../context/context";

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
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");

    const [holdings, ] = useRecoilState(state.walletHoldings);
    const [prices, ] = useRecoilState(state.contractPrices);
    const [relPrices, ] = useRecoilState(state.relPrices);
    const [contractFees, ] = useRecoilState(state.contractFees);
    const [currency, setCurrency] = useState(Object.keys(holdings)[1] || 'BNB');
    const [selectedToken, setSelectedToken] = useState({name: 'SETH'});

    const context = useContext(WalletContext);
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
        const buyCurrency = currency[0] === 'x' ? `S${currency.slice(1)}` : 'BNB';
        const balance = Number(holdings[buyCurrency]) || 0;
        const percentage = value / 100;
        const calculatedAmount = percentage * (buyCurrency === "BNB" ? (balance * 1.0e-18).toFixed(4) : balance);
        setAmount(calculatedAmount);

    };

    const balance = currency[0] !== "x" ? (parseInt(holdings['BNB']) * 1.0e-18).toFixed(4) : parseInt(holdings[currency==='xSBNB' ? 'SURGE' : currency.slice(1)]);
    return (
        <Box align={"center"} pad={(size === "small" ? "xlarge" : "medium")} small round>
            <Box gap={"medium"}>
                <Box gap={"small"}>
                    <Text>Token</Text>
                    <TokenSelector onSelect={onSelectedTokenChange} defaultToken={selectedToken}/>
                    <Text>price: {parseFloat(prices[selectedToken.name]).toFixed(18)} {selectedToken.name.substr(1)}</Text>

                    <Text>fee: {(100-parseFloat(contractFees[selectedToken.name][0]))}%</Text>
                </Box>
                <Box gap={"small"}>
                    <Box direction={"row"} justify={"between"}>
                        <Text >{currency[0] !== 'x' ? 'BNB' : currency.slice(1)}</Text>
                        <Text>Balance: {balance}</Text>
                    </Box>
                    <TextInput
                        type={"number"}
                        value={amount}
                        onChange={onAmountChange}
                    />

                    <Text> (estimated) to be received: </Text>
                    <Text>
                    {relPrices ?
                        ((((amount) / (prices[selectedToken.name]) ) * (parseFloat(contractFees[selectedToken.name][0]) / 100))/relPrices[selectedToken.name]).toFixed(0)
                        :""
                    }
                    </Text>
                    <FormFieldError message={amountErrorMessage}/>
                </Box>
                <Box gap={"small"} align={"center"}>
                    <TokenAmountSlider onValueChange={onTokenSliderChange} defaultValue={0}/>
                </Box>
            </Box>
            <Box direction="row" gap="medium" margin={"small"}>
                {/*<Button type="reset" label="Clear" size={"large"}/>*/}
                <BuyButton type="submit" label="Accept" size={"large"} action={"buy"} asset={selectedToken.name} amount={amount} primary/>
            </Box>
        </Box>
    )
}

const SellForm = (props) => {
    const [holdings, setHoldings] = useRecoilState(state.walletHoldings);
    const [amount, setAmount] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [received, setReceived] = useState(0)
    const [amountErrorMessage, setAmountErrorMessage] = useState("");
    const [currency, setCurrency] = useState(Object.keys(holdings)[1]);
    const context = useContext(WalletContext);


    const [selectedToken, setSelectedToken] = useState({name: currency});


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
        const balance = selectedToken.name === "BNB" ? (parseInt(holdings[selectedToken.name]) * 1.0e-18).toFixed(4) : parseInt(holdings[selectedToken.name]);
        const percentage = value / 100;
        const calculatedAmount = percentage * balance;
        setAmount(parseInt(calculatedAmount));
    };


    useEffect( () => {
        if (amount) {
            context.wallet.contracts[currency].getValueOfHoldings(context.wallet.accountAddress).then((value) => {
                value = parseInt(value);
                const scale = 1.0 / holdings[currency];
                setReceived(((scale * amount) * value) * 1.0e-18);
            })
        }

    }, [amount]);
    const balance = currency === "BNB" ? (parseInt(holdings[currency]) * 1.0e-18).toFixed(4) : parseInt(holdings[currency]);
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
                        <Text>W{currency.slice(1)}</Text>
                        <Text>Received: {received.toFixed(10)}</Text>
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
                {/*<Button type="reset" label="Clear" size={"large"}/>*/}
                <BuyButton type="submit" label="Accept" size={"large"} action={"sell"} asset={currency} amount={amount} primary/>
            </Box>
        </Box>
    )
}

// TODO selling and buying forms need to be a generic form component
const BridgeForm = (props) => {

}

const Bridge = (props) => {
    const [action, setAction] = React.useState(false);
    const [connected, ] = useRecoilState(state.walletConnected);
    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);

    return (
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
                        {/*<Box margin={(size === "xsmall" ? "medium" : "small")}>*/}
                            <Text
                                // size={((size === "xsmall" || size === "small") ? "large" : "large")}
                            >Trade</Text>
                        {/*</Box>*/}

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
                        {connected ?
                            (!action ? <BuyForm
                            defaultToken={contracts.SurgeETH}
                        /> : <SellForm
                            defaultToken={contracts.SurgeETH}
                        />):""}
                    </CardBody>
                </Card>

    );
}

export default Bridge;
