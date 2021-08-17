import React, {useContext, useEffect, useState} from "react";
import {getHistoricPriceData} from "../common/price";
import contracts, {SurgeBNB} from "../contracts/contracts";
import Chart from "./Chart";
import Wallet from "../common/wallet";

import AddressSelector from "./AddressSelector/AddressSelector";
import {Box, ResponsiveContext, Select, Text} from "grommet";
import {useRecoilState, useRecoilValue} from "recoil";
import state from "../state/state";

export default function XPriceChart() {
    const [priceData, setPriceData] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();

    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);
    // this.contracts = Wallet.contracts;


    const onSelectedAddressChange = (address) => {
        setSelectedAddress(address);
        console.log('address changed', address);
    };



        // .contracts["SurgeBNB"].getAddressOfContract();

    useEffect(() => {
        (async () => {
            console.error("selectedAddress: ", selectedAddress)
            const data = await getHistoricPriceData(await selectedAddress);
            setPriceData(await data);
        })();
    }, []);


    return (

        <Box align={"center"} pad={(size === "small" ? "xlarge" : "medium")} small round>
            <Box gap={"medium"}>
                <Box gap={"small"}>
                    <Text>Token</Text>
                    <AddressSelector onSelect={onSelectedAddressChange} defaultAddress={selectedAddress}/>
                </Box>
                <Chart data={priceData}/>
            </Box>
        </Box>
    );
}
