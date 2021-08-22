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
    const [selectedInterval, setSelectedInterval] = useState();

    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);


    const onSelectedAddressChange = (address) => {
        setSelectedAddress(address);
    };

    const onIntervalSliderChange = (interval) => {
        console.log("onTokenSliderChange", interval)
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
            // width={"large"}
            height={"large"}
            small
            round
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
            <CardBody>
                <Box align={"center"} pad={{vertical: "small", horizontal: size === "small" ? "xxlarge" : "xlarge"}} small round>


                            {priceData == null ? <Text>Loading...</Text> : <Chart data={priceData}/>}

                </Box>
                <Box gap={"small"} align={"center"}>
                    <IntervalSlider onIntervalChange={onIntervalSliderChange} defaultInterval={2}/>
                </Box>
            </CardBody>
        </Card>
    );
}
