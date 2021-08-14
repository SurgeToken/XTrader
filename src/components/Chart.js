import {DataChart, Card, Box, Text, CardBody, CardHeader} from "grommet";
import Draggable from "react-draggable";
import React from "react";

export default ({ data }) => {
    return ( <Draggable>
        <Card width={"large"}
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
                        series={['price', 'date']}
                        chart={[
                            { property: 'price', type: 'line', opacity: 'medium', thickness: 'xsmall' },
                            { property: 'price', type: 'point', point: 'circle', thickness: 'medium' }
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
