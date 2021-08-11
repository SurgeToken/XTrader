import {
    Box, Form, FormField, Button, TextInput, Select,
    Grid, Heading, Header, Menu, Anchor,
    Tab, Tabs, Card, CardHeader, CardFooter, CardBody, ResponsiveContext
} from "grommet";
import React, {useState, useEffect} from "react";
import {buy, sell} from "../common/trade";
import {Contracts} from "../common/contracts";

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

    const buyTokens = async () => {
        if (!amountValid) {
            return;
        }

        const result = await buy(Contracts.SurgeBnb, amount);

        console.log('Transaction result', result);
    };
    return (

        <CardBody align={"center"} background={"black"} pad={"medium"} gap={"medium"} small round>
            <Box pad={"small"} gap={"xsmall"}>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"}>
                    <Heading level={4} textAlign={"end"}>Native Surge</Heading>
                    <Select
                        options={['sBNB', 'sUSD', 'sETH']} // TODO retrieve these from a database
                    />

                </Grid>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"}>
                    <Heading level={4} textAlign={"end"}>Quantity</Heading>
                    <TextInput suggestions={[...Array(20).keys()].map((key) => `${100 - (key * 5)}%`)}/>
                </Grid>
            </Box>
            <Box direction="row" gap="large">
                <Button type="submit" label="Accept" size={"large"}/>
                <Button type="reset" label="Clear" size={"large"}/>
            </Box>
        </CardBody>
    )
}


const SellForm = () => {
    return (
        <CardBody align={"center"} background={"black"} pad={"medium"} gap={"medium"} small round>
            <Box pad={"small"} gap={"xsmall"}>
                <Grid columns={["small", "flex"]} gap={"small"}  align={"center"}>
                    <Heading level={4} textAlign={"end"}>Native Surge</Heading>
                    <Select
                        options={['sBNB', 'sUSD', 'sETH']} // TODO Retrieve these from a database
                    />

                </Grid>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"}>
                    <Heading level={4} textAlign={"end"}>Quantity</Heading>
                    <TextInput suggestions={[...Array(20).keys()].map((key) => `${100 - (key * 5)}%`)}/>
                </Grid>
            </Box>
            <Box direction="row" gap="large">
                <Button type="submit" label="Accept" size={"large"}/>
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
                <Heading margin={{'left': '1%'}} level={5}>
                    X Token Trader
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
