import {Card, Box, Text, CardBody, CardHeader} from "grommet";
import Draggable from "react-draggable";
import React, {useEffect, useState} from "react";
import Chart from "@lenicdev/react-lightweight-charts";
import {TickMarkType} from "lightweight-charts";

const CHART_OPTIONS = {
    alignLabels: true,
    layout: {
        backgroundColor: "#060818",
        textColor: "#fff"
    },
    grid: {
        vertLines: {
            color: "rgba(33,187,177,0.34)"
        },
        horzLines: {
            color: "rgba(33,187,177,0.34)"
        },
    },
    timeScale: {
        rightOffset: 12,
        barSpacing: 3,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: true,
        visible: true,
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time, tickMarkType, locale) => {
            const date = new Date(time * 1000);
            switch (tickMarkType) {
                case TickMarkType.Year: return date.toLocaleDateString();
                case TickMarkType.Month: return date.toLocaleDateString();
                case TickMarkType.DayOfMonth: return date.toLocaleDateString();
                case TickMarkType.Time: return date.toLocaleTimeString();
                case TickMarkType.TimeWithSeconds: return date.toLocaleTimeString();
            }
        },
    }
};

export default ({ data }) => {
    const [series, setSeries] = useState([{ data: [] }]);

    useEffect(() => {
        const series = [{
            data,
            options: {
                topColor: "rgba(33,187,177,0.81)",
                bottomColor: "rgba(33,187,177,0.27)",
                lineColor: "#21BBB1"
            }
        }];
        setSeries(series);
    }, [data]);

    return ( <Draggable>
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
                    <Chart options={CHART_OPTIONS} areaSeries={series} autoWidth height={420}/>
                </Box>
            </CardBody>
        </Card>
    </Draggable>

    );
}
