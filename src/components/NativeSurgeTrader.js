import {Box, Form, FormField, Button, TextInput, Select,
    Grid, Heading, Header, Menu, Anchor,
    Tab, Tabs, Card, CardHeader, CardFooter, CardBody} from "grommet";
import React from "react";

const BuyForm = () => {
    return (

        <CardBody align={"center"} background={"black"} pad={"medium"} gap={"medium"} small round>
            <Box pad={"small"} gap={"xsmall"}>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"}>
                    <Heading level={4} textAlign={"end"}>Native Surge</Heading>
                    <Select
                        options={['sBNB', 'sUSD', 'sETH']} // TODO retrieve these from a database
                    />

                </Grid>
                <Grid columns={["small", "flex"]} gap={"small"} align={"center"} >
                    <Heading level={4} textAlign={"end"}>X Token</Heading>
                    <Select
                        options={['xsBNB', 'xsUSD', 'xsETH']} // TODO retrieve these from a database
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
                    <Heading level={4} textAlign={"end"}>Native Surge Trader</Heading>
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
