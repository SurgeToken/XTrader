import React, {useEffect, useState} from "react";
import {getHistoricPriceData} from "../common/price";
import Chart from "./Chart";

import AddressSelector from "./AddressSelector/AddressSelector";
import {Box, ResponsiveContext, Select, Text} from "grommet";

export default function XPriceChart() {
    const [priceData, setPriceData] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();

    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);


    const onSelectedAddressChange = (address) => {
        setSelectedAddress(address);
    };

    useEffect(() => {
        (async () => {
            if (selectedAddress !== undefined){
                const data = await getHistoricPriceData(selectedAddress);
                setPriceData(data);
            }
        })();
    }, [selectedAddress]);


    return (

        <Box align={"center"} pad={(size === "small" ? "xlarge" : "medium")} small round>
            <Box gap={"medium"}>
                <Box gap={"small"}>
                    <Text>Token</Text>
                    <AddressSelector onSelect={onSelectedAddressChange}/>
                </Box>
                {priceData == null ? <Text>Loading...</Text> : <Chart data={priceData}/>}
            </Box>
        </Box>
    );
}
