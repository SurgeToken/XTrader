import {Box, Form, FormField, Button, TextInput, Select, Tab, Tabs} from "grommet";
import React, {useState} from "react";
import FormFieldError from "./FormFieldError/FormFieldError";
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
        <Form>
            <Box align={"center"} pad={"medium"}>
                <FormField
                    label="Surge"
                    name="xToken"
                    component={Select}
                    onChange={(event) => console.log(event)}
                    options={['sBNB', 'sUSD', 'sBTC', 'sETH']}
                />
                <TextInput
                    label="To"
                    placeholder={"amount"}
                    onChange={onAmountChange}
                />
                <FormFieldError message={amountErrorMessage} />
            </Box>
            <Box direction="row" gap="medium" >
                <Button type="submit"  label="Accept" size={"large"} onClick={buyTokens}/>
                <Button type="reset" label="Clear" size={"large"}/>
            </Box>
        </Form>
    )
}

const SellForm = () => {
    const [amount, setAmount] = useState(0);
    const [amountValid, setAmountValid] = useState(true);
    const [amountErrorMessage, setAmountErrorMessage] = useState("");

    const onAmountChange = (event) => {
        const errorMessage = validateAmount(event.target.value);

        if (errorMessage != null) {
            setAmount(0);
            setAmountValid(false);
            setAmountErrorMessage(errorMessage);
            return;
        }

        setAmount(parseFloat(event.target.value));
        setAmountValid(true);
        setAmountErrorMessage("");
    };

    const sellTokens = async () => {
        if (!amountValid) {
            return;
        }

        const result = await sell(Contracts.SurgeBnb, amount);

        console.log('Transaction result', result);
    };

    return (
        <Form>
            <Box align={"center"} pad={"medium"}>
                <FormField
                    label="Surge"
                    component={Select}
                    onChange={(event) => console.log(event)}
                    options={['sBNB', 'sUSD', 'sBTC', 'sETH']}
                />

                <TextInput
                    label="To"
                    placeholder={"quantity"}
                    onChange={onAmountChange}
                />
                <FormFieldError message={amountErrorMessage} />
            </Box>
            <Box direction="row" gap="medium" >
                <Button type="submit"  label="Accept" size={"large"} onClick={sellTokens}/>
                <Button type="reset" label="Clear" size={"large"}/>
            </Box>
        </Form>
    )
}

const nativeSurgeTrader = () => {
    return (
        <Box border small round align={"center"} pad={"medium"} background={"dark-1"} >
            <Tabs>
                <Tab title={"Buy"}>
                    <BuyForm/>
                </Tab>
                <Tab title={"Sell"}>
                    <SellForm/>
                </Tab>
            </Tabs>
        </Box>
    );
}

export default nativeSurgeTrader;
