import {Card, Box, Text, CardBody, CardHeader, ResponsiveContext} from "grommet";
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
    localization: {
        priceFormatter: function(price) { return price.toFixed(12)+""},
    },
    timeScale: {
        rightOffset: 0,
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

    // noinspection JSCheckFunctionSignatures
    const size = React.useContext(ResponsiveContext);

    return (

        // <Box align={"center"} small round>
                    <Chart align="center" width={"75%"} options={CHART_OPTIONS} areaSeries={series} autoWidth height={420}/>
        // </Box>

    );
}
