import {
    DataChart, Card, Box, Text, Anchor, Button, CardBody, Menu,
    CardHeader, FormField, Header, Tab, Tabs, ResponsiveContext,
} from "grommet";
import Draggable from "react-draggable";
import {Contracts} from "../common/contracts";
import React from "react";

export default () => {
    const data = [];
    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);

    for (let i = 1; i < 60; i += 1) {
        const v = Math.sin(i / 2.0);
        data.push({
            date: `2020-${((i % 12) + 1).toString().padStart(2, 0)}-01`,
            percent: Math.round(Math.abs(v * 100)),
        });
    }
    return ( <Draggable disabled={true}>
        <Card width={"large"}
              height={"large"}
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
                    fill={true}
                    // margin={(size === "xsmall" ? "medium" : "small")}
                >
                    <Text textAlign={"center"}
                        // size={((size === "xsmall" || size === "small") ? "large" : "large")}
                    >sBNB</Text>
                </Box>
                <Box
                    align={"center"}
                    justify={"end"}
                    direction={"row"}
                    gap={"medium"}
                    pad={{left: "medium"}}
                    // margin={(size === "xsmall" ? "medium" : "small")}
                >

                </Box>
            </CardHeader>
            <CardBody>
                <Box pad={"small"}>
                    <DataChart
                        data={data}
                        series={['date', 'percent']}
                        chart={[
                            { property: 'percent', thickness: 'xsmall', type: 'line' },
                            {
                                property: 'percent',
                                thickness: 'xsmall',
                                type: 'point',
                                point: 'circle',
                            },
                        ]}
                        guide={{ x: { granularity: 'fine' }, y: { granularity: 'medium' } }}
                        size={{ width: 'fill' }}
                        detail
                    />
                </Box>

            </CardBody>
        </Card>
    </Draggable>

    );
}
