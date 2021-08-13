import {DataChart, Card, Box, Text, Anchor, Button, CardBody, Menu,
    CardHeader, FormField, Header, Tab, Tabs, DataTable} from "grommet";
import Draggable from "react-draggable";
import {Contracts} from "../common/contracts";
import React from "react";

export default () => {
    const columns = [
        {
            property: 'Token',
            header: <Text>Token</Text>
        },
        {
            property: 'Quantity',
            header: <Text>Quantity</Text>

        },
        {
            property: '24H',
            header: <Text>24H</Text>

        },
        {
            property: 'Value',
            header: <Text>Value</Text>

        }
    ]
    const data = ['SBNB', 'XSBNB', 'SETH'].map((val) => {
        return {
            Token: val,
            Quantity: Math.trunc(Math.random() * 100000),
            Change: '',
            Value: `\$ ${(Math.random()*1000).toFixed(2)}`}
    });
    return ( <Draggable>
            <Card width={"medium"}
                  height={"medium"}
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
                        // margin={(size === "xsmall" ? "medium" : "small")}
                    >
                        <Text
                            // size={((size === "xsmall" || size === "small") ? "large" : "large")}
                        >Assets</Text>
                    </Box>
                </CardHeader>
                <CardBody pad={"small"}            align={"center"}
                >
                    <DataTable fill={"true"} columns={columns} data={data}/>
                </CardBody>
            </Card>
        </Draggable>

    );
}
