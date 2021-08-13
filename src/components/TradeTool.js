import React from "react";
import {Box, Button, CardBody, Grid, Heading, Select, TextInput} from "grommet";
import TokenSelector from "./TokenSelector/TokenSelector";
import FormFieldError from "./FormFieldError/FormFieldError";

const TradeTool = () => {
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
}
