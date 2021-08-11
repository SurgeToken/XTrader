import {Box, Form, FormField, Button, TextInput, Select,
    Grid, Heading, Header, Menu, Anchor,
    Tab, Tabs, Card, CardHeader, CardFooter, CardBody} from "grommet";
import React, {useEffect, useState} from "react";
import {provider, isConnected, getAccount, connectWallet} from "../common/walletConnect";

const BuyForm = () => {
    return (

        <CardBody align={"center"} background={"black"} pad={"medium"} gap={"medium"} small round>
            <Box pad={"small"} gap={"xsmall"}>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"}>
                    <Heading level={4} textAlign={"end"}>Native Surge</Heading>
                    <Select
                        options={['sBNB', 'sUSD', 'sETH']}
                    />

                </Grid>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"} >
                    <Heading level={4} textAlign={"end"}>X Token</Heading>
                    <Select
                        options={['xsBNB', 'xsUSD', 'xsETH']}
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
    // const [value, setValue] = React.useState({});
    return (
        <CardBody disabled={!isConnected()} align={"center"} background={"black"} pad={"medium"} gap={"medium"} small round>
            <Box pad={"small"} gap={"xsmall"}>
                <Grid columns={["small", "flex"]} gap={"small"}  align={"center"}>
                    <Heading level={4} textAlign={"end"}>X Token</Heading>
                    <Select
                        options={['xsBNB', 'xsUSD', 'xsETH']}
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

const Disconnected = () => {

}


const XTokenTrader = () => {
    const [account, setAccount] = useState(0);
    useEffect(() => {
        (async() => {
            let act = await getAccount().catch(); // You need to catch this
            setAccount(act);
        })()

    }, []);
    const [action, setAction] = React.useState(0);
    return (
        <Card  small round pad={"xsmall"} background={"rgb(45, 45, 45)"} >
            <Grid columns={["75%", "25%"]} direction={"row"} pad={"none"}>
                <Heading margin={{'left': '5%'}} level={4}>
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

export default XTokenTrader;
