import {Box, Form, FormField, Button, TextInput, Select, Tab, Tabs} from "grommet";
import React from "react";

const BuyForm = () => {
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
                />
            </Box>
        </Form>
    )
}

const SellForm = () => {
    // const [value, setValue] = React.useState({});
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
                />
            </Box>
        </Form>
    )
}


export default () => {
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
            <Box direction="row" gap="medium" >
                <Button type="submit"  label="Accept" size={"large"}/>
                <Button type="reset" label="Clear" size={"large"}/>
            </Box>
        </Box>
    );
}
