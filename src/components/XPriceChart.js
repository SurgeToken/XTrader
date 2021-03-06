import React, {useEffect, useState} from "react";
import {getHistoricPriceData} from "../common/price";
import Chart from "./Chart";

import AddressSelector from "./AddressSelector/AddressSelector";
import {Card, CardBody, CardHeader, CardFooter, Box, ResponsiveContext, Select, Text, Anchor, Button} from "grommet";
import TokenAmountSlider from "./TokenAmountSlider";
import IntervalSlider from "./IntervalSlider";

export default function XPriceChart() {
    const [priceData, setPriceData] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();
    const [selectedInterval, setSelectedInterval] = useState("1m");

    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);


    const onSelectedAddressChange = (address) => {
        setSelectedAddress(address);
    };

    const onIntervalSliderChange = (interval) => {
        setSelectedInterval(interval);
    };

    useEffect(() => {
        (async () => {
            if (selectedAddress !== undefined){
                const data = await getHistoricPriceData(selectedAddress, selectedInterval);
                setPriceData(data);
            }
        })();
    }, [selectedAddress, selectedInterval]);


    return (
        <Card
            // height={"large"}
            small
            round
            pad={{bottom:"large"}}
            background={"spaceBlue"}
            elevation={"large"}
            style={{border: "solid 1px #21BBB1"}}>
            <CardHeader
                flex={"shrink"}
                // direction={"column"}
                align={"center"}
                direction={(size === "xsmall" ? "column" : "row")}
                justify={(size === "xsmall" ? "evenly" : "between")}
                gap={"none"}
                pad={{top: "small", bottom: "small", right: "medium", left: "medium"}}
                margin={(size === "xsmall" ? "medium" : "small")}
            >
                <Text pad={{bottom: "small"}}>Token</Text>
                <AddressSelector  pad={{top: "small"}} onSelect={onSelectedAddressChange}/>
            </CardHeader>
            <CardBody pad={"xxlarge"}>
                <Box align={"center"} pad={{vertical: "small", horizontal: size === "small" ? "xxlarge" : "xlarge"}} large round>
                    {priceData == null ? <Text>Loading...</Text> : <Chart data={priceData}/>}
                </Box>
                <Box gap={"small"} align={"center"}>
                    <IntervalSlider onIntervalChange={onIntervalSliderChange} defaultInterval={"1m"}/>
                </Box>
            </CardBody>
        </Card>
    );
}