import {Box, Form, FormField, Button, TextInput, Select, Tab, Tabs} from "grommet";
import React, {useState} from "react";
import FormFieldError from "./FormFieldError/FormFieldError";
import {buy, sell} from "../common/trade";
import {Contracts} from "../common/contracts";
import TokenSelector from "./TokenSelector/TokenSelector";

function validateAmount(amount) {
    if (isNaN(parseFloat(amount))) {
        return "Amount is not a number"
    }

    if (Number(amount) <= 0) {
        return "Amount must be greater than 0"
    }

    return ""
}

const BuyForm = () => {
    const [amount, setAmount] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");
    const [selectedToken, setSelectedToken] = useState(Contracts.SurgeBnb);

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
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"} >
                    <Heading level={4} textAlign={"end"}>X Token</Heading>
                    <Select
                        options={['xsBNB', 'xsUSD', 'xsETH']} // TODO retrieve these from a database
                    />
                </Grid>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"}>
                    <Heading level={4} textAlign={"end"}>Quantity</Heading>
                    <TextInput
                        suggestions={[...Array(20).keys()].map((key) => `${100 - (key * 5)}%`)}
                        onChange={onAmountChange}
                    />
                    <FormFieldError message={amountErrorMessage} />
                </Grid>
            </Box>
            <Box direction="row" gap="large">
                <Button type="submit" label="Accept" size={"large"} onClick={buyTokens}/>
                <Button type="reset" label="Clear" size={"large"}/>
            </Box>
        </CardBody>
    )
}

const SellForm = () => {
    const [amount, setAmount] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");
    const [selectedToken, setSelectedToken] = useState(Contracts.SurgeBnb);

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
                        suggestions={[...Array(20).keys()].map((key) => `${100 - (key * 5)}%`)}
                        onChange={onAmountChange}
                    />
                    <FormFieldError message={amountErrorMessage} />
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
    return (
        <Card small round pad={"xsmall"} background={"rgb(45, 45, 45)"} >
            <Grid columns={["80%", "20%"]} direction={"row"} pad={"none"}>
                <Heading margin={{'left': '1%'}} level={4}>
                    Native Surge Trader
                </Heading>
                <Box align={"center"} direction={"row"} gap={"medium"}>
                    <Anchor color={action ? "brand" : "status-unknown"} onClick={() => setAction(!action)}><u>Buy</u></Anchor>
                    <Anchor color={action ? "status-unknown" : "brand"} onClick={() => setAction(!action)}><u>Sell</u></Anchor>
                </Box>
            </Grid>
            {action ? BuyForm() : SellForm()}

        </Card>
    );
}

export default NativeSurgeTrader;
