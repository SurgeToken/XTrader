import {useState} from "react";
import Slider from "rc-slider";
import '../themes/rc-slider.css';
import {Box, Text} from "grommet";

export default function IntervalSlider({ defaultInterval, onIntervalChange }) {
    const [interval, setInterval] = useState(defaultInterval || 6);
    // const [intervalHandle, setIntervalHandle] = useState("1d");
    let intervalArr = ["1m", "5m", "15m", "1h", "6h", "12h", "1d", "3d"/*, "1w", "1mo"*/]
    const intervalObj = intervalArr.map(point => {
        return {index: intervalArr.indexOf(point), label: point}
    })

    const onSliderValueChange = (event) => {
        setInterval(intervalObj[event]);
        // setIntervalHandle(intervalArr[event]);
        console.log("onSliderValueChange (event): ", event, intervalObj[event], event.toString())
        if (onIntervalChange) {
            onIntervalChange(intervalObj[event].label);
        }
    };

    return (
    <Box align="center" width={"75%"}>

        <Slider
            dots
            value={intervalObj.index}
            startPoint={defaultInterval}
            min={0}
            max={intervalObj.length -1}
            step={1}
            onChange={onSliderValueChange}
            ariaLabelForHandle={intervalObj.label}
            ariaLabelledByForHandle={intervalObj.index}
        />
        {/*<Text size="small">{intervalArr[interval]}</Text>*/}
    </Box>
    )
}
