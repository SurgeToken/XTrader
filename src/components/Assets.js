import {
    DataChart, Card, Box, Text, Anchor, Button, CardBody, Menu,
    CardHeader, FormField, Header, Tab, Tabs, DataTable, ResponsiveContext, CheckBox,
} from "grommet";
import Draggable from "react-draggable";
import contracts from "../contracts/contracts";
import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import state from "../state/state";

const formatTotal = (value) => {
    return `\$${value.toFixed(2)}`;
}

const afterTax = (value, taxation, afterTaxState) => {
    if (afterTaxState) {
        return parseFloat(value) * taxation

    }
    return value
}

export default () => {
    const [holdings, ] = useRecoilState(state.walletHoldings);
    const [holdingValues, ] = useRecoilState(state.walletHoldingValues);
    const [contractFees, ] = useRecoilState(state.contractFees);
    const [relPricesBUSD, ] = useRecoilState(state.relPricesBUSD);
    const [relPricesBNB, ] = useRecoilState(state.relPricesBNB);
    const [dataState, setDataState] = useState({})
    const [afterTaxState, setAfterTaxState] = useState(false)
    const columns = [
        {
            property: 'Token',
            primary: true,
            header: <Text>Token</Text>,
            align: "center",
            // footer: "Total"
        },
        {
            property: 'Quantity',
            align: "center",
            header: <Text>Quantity</Text>

        },
        // {
        //     property: 'Change',
        //     size: "xxsmall",
        //     render: (col) => <Text color={col.Change > 50 ? "green" : "red"}>{col.Change.toFixed(0)}%</Text>,
        //     align: "center",
        //     header: <Text>24H</Text>,
        //
        // },
        {
            property: 'Value',
            align: "center",
            header: 'Value'
        },
        {
            property: 'Value_USD',
            align: "center",
            header: 'Value',
            render: (data) => formatTotal(data.Value_USD),
            aggregate: 'sum',
            footer: { aggregate: true },
        }
    ]
    // useEffect(() => {
        const data = Object.keys(holdingValues).map((val) => {
            return {
                Token: val,
                Quantity: holdings[val],
                // Change: Math.random() * 100,
                Value: (parseInt(afterTax(holdingValues[val], (parseFloat(contractFees[val][1])/100), afterTaxState))*1.0e-18).toFixed(6).toString() + " w" + val.substr(1),
                Value_USD: (parseInt(afterTax(holdingValues[val], (parseFloat(contractFees[val][1])/100), afterTaxState))*1.0e-18 * relPricesBUSD[val])
                // Value_USD: (parseInt(afterTax(holdingValues[val], (parseFloat(contractFees[val][1])/100), afterTaxState))*relPricesBUSD[val]*1.0e-18).toFixed(2).toString()
            }
        });

    // setDataState(data)
    // },[afterTaxState, holdingValues])
    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext)

    return (

                <Card
                small
                round
                background={"spaceBlue"}
                elevation={"large"}
                style={{border: "solid 1px #21BBB1"}}>

                <CardHeader
                    flex={"shrink"}
                    // direction={(size === "xsmall" ? "column" : "row")}
                    // justify={(size === "xsmall" ? "evenly" : "between")}
                    gap={"none"}
                    pad={{top: "small", bottom: "small", right: "medium", left: "medium"}}
                >

                        <Box
                            align={"center"}
                            fill={true}
                            // margin={(size === "xsmall" ? "medium" : "small")}
                        >
                            <Text textAlign={"center"}
                                // size={((size === "xsmall" || size === "small") ? "large" : "large")}
                            >Assets</Text>
                            <CheckBox label={"after tax"} toggle={true} reverse={true} onChange={(event) => {
                                setAfterTaxState(event.target.checked)
                            }}/>
                        </Box>
                </CardHeader>
                <CardBody pad={"small"}            align={"center"}
                >
                    { relPricesBUSD ?
                    <DataTable pad={"small"} fill={"horizontal"} columns={columns} data={ data || dataState}/>
                    : ""
                    }
                </CardBody>
            </Card>

    );
}
