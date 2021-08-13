import {DataChart, Card, Box, Text, Anchor, Button, CardBody, Menu,
    CardHeader, FormField, Header, Tab, Tabs, DataTable} from "grommet";
import Draggable from "react-draggable";
import {Contracts} from "../common/contracts";
import React from "react";

const formatTotal = (value) => {
    return `\$${value.toFixed(2)}`;
}

export default () => {
    const columns = [
        {
            property: 'Token',
            primary: true,
            header: <Text>Token</Text>,
            align: "center",
            footer: "Total"
        },
        {
            property: 'Quantity',
            align: "center",
            header: <Text>Quantity</Text>

        },
        {
            property: 'Change',
            size: "xxsmall",
            render: (col) => <Text color={col.Change > 50 ? "green" : "red"}>{col.Change.toFixed(0)}%</Text>,
            align: "center",
            header: <Text>24H</Text>,

        },
        {
            property: 'Value',
            align: "center",
            header: 'Value',
            render: (data) => formatTotal(data.Value),
            aggregate: 'sum',
            footer: { aggregate: true },
        }
    ]
    const data = ['SBNB', 'XSBNB', 'SETH'].map((val) => {
        return {
            Token: val,
            Quantity: Math.trunc(Math.random() * 100000),
            Change: Math.random() * 100,
            Value: Math.random()*1000}
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
                        fill={true}
                        // margin={(size === "xsmall" ? "medium" : "small")}
                    >
                        <Text textAlign={"center"}
                            // size={((size === "xsmall" || size === "small") ? "large" : "large")}
                        >Assets</Text>
                    </Box>
                </CardHeader>
                <CardBody pad={"small"}            align={"center"}
                >
                    <DataTable pin fill={"true"} columns={columns} data={data}/>
                </CardBody>
            </Card>
        </Draggable>

    );
}
