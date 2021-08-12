import {Box, Button, TextInput, Select, Card, CardBody, Grid, Heading, Anchor} from "grommet";
import React, {useEffect, useState} from "react";
import FormFieldError from "./FormFieldError/FormFieldError";
import {buy, sell} from "../common/trade";
import {Contracts} from "../common/contracts";
import TokenSelector from "./TokenSelector/TokenSelector";
import TokenAmountSlider from "./TokenAmountSlider";
import {getAccount, getSurgeBalance} from "../common/wallet";

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
    const address = await getAccount();
    return getSurgeBalance(contract, address);
}

const BuyForm = (props) => {
    const [amount, setAmount] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");
    const [selectedToken, setSelectedToken] = useState(props.defaultToken || Contracts.SurgeBnb);

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
        const percentage = value / 100;
        const calculatedAmount = percentage * props.tokenBalance;
        setAmount(calculatedAmount);
    };

    const buyTokens = async () => {
        if (!amountValid) {
            return;
        }

        const result = await buy(selectedToken, amount);

        console.log('Transaction result', result);
    };

    return (
        <CardBody align={"center"} background={"black"} pad={"medium"} gap={"medium"} small round>
            <Box pad={"small"} gap={"xsmall"}>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"}>
                    <Heading level={4} textAlign={"end"}>Native Surge</Heading>
                    <TokenSelector onSelect={onSelectedTokenChange} defaultToken={selectedToken} />
                </Grid>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"}>
                    <Heading level={4} textAlign={"end"}>Quantity</Heading>
                    <TextInput
                        value={amount}
                        onChange={onAmountChange}
                    />
                    <FormFieldError message={amountErrorMessage} />
                    <TokenAmountSlider onValueChange={onTokenSliderChange} defaultValue={0}/>
                </Grid>
            </Box>
            <Box direction="row" gap="large">
                <Button type="submit" label="Accept" size={"large"} onClick={buyTokens}/>
                <Button type="reset" label="Clear" size={"large"}/>
            </Box>
        </CardBody>
    )
}

const SellForm = (props) => {
    const [amount, setAmount] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");
    const [selectedToken, setSelectedToken] = useState(props.defaultToken || Contracts.SurgeBnb);

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
        const percentage = value / 100;
        const calculatedAmount = percentage * props.tokenBalance;
        setAmount(calculatedAmount);
    };

    const sellTokens = async () => {
        if (!amountValid) {
            return;
        }

        const result = await sell(selectedToken, amount);

        console.log('Transaction result', result);
    };

    return (
        <CardBody align={"center"} background={"black"} pad={"medium"} gap={"medium"} small round>
            <Box pad={"small"} gap={"xsmall"}>
                <Grid columns={["small", "flex"]} gap={"small"}  align={"center"}>
                    <Heading level={4} textAlign={"end"}>Native Surge Trader</Heading>
                    <TokenSelector onSelect={onSelectedTokenChange} defaultToken={selectedToken} />

                </Grid>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"}>
                    <Heading level={4} textAlign={"end"}>Quantity</Heading>
                    <TextInput
                        value={amount}
                        onChange={onAmountChange}
                    />
                    <FormFieldError message={amountErrorMessage} />
                    <TokenAmountSlider onValueChange={onTokenSliderChange} defaultValue={0}/>
                </Grid>
            </Box>
            <Box direction="row" gap="large">
                <Button type="submit" label="Accept" size={"large"} onClick={sellTokens}/>
                <Button type="reset" label="Clear" size={"large"}/>
            </Box>
        </CardBody>
    )
}


const NativeSurgeTrader = () => {
    const [action, setAction] = React.useState(0);
    const [currentTokenBalance, setCurrentTokenBalance] = useState(0);

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
        <Card small round pad={"xsmall"} background={"rgb(45, 45, 45)"} >
            <Grid columns={["auto", "auto"]}>
                <Heading margin={{'left': '1%'}} level={4}>
                    Native Surge Trader
                </Heading>
                <Box align={"center"} justify={"end"} direction={"row"} gap={"medium"} pad={"small"}>
                    <Anchor onClick={() => setAction(true)} color="white">
                        <Button label="Buy" plain={!action} />
                    </Anchor>
                    <Anchor onClick={() => setAction(false)} color="white">
                        <Button label="Sell" plain={!!action} />
                    </Anchor>
                </Box>
            </Grid>
            {action ? <BuyForm
                onTokenChange={onTokenChange}
                tokenBalance={currentTokenBalance}
                defaultToken={Contracts.SurgeBnb}
            /> : <SellForm
                onTokenChange={onTokenChange}
                tokenBalance={currentTokenBalance}
                defaultToken={Contracts.SurgeBnb}
            />}
        </Card>
    );
}

export default NativeSurgeTrader;
