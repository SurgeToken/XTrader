import {useEffect, useState} from "react";
import Slider, {createSliderWithTooltip} from "rc-slider";
import '../themes/rc-slider.css';
import {Box, Text} from "grommet";

export default function IntervalSlider({ defaultInterval, onIntervalChange }) {
    const [interval, setInterval] = useState(defaultInterval || 0);
    const intervalArr = ["1m", "5m", "15m", "1h", "6h", "12h", "1d", "3d"/*, "1w", "1mo"*/]
    const onSliderValueChange = (event) => {
        setInterval(intervalArr[event]);

        if (onIntervalChange) {
            onIntervalChange(intervalArr[event]);
        }
    };

    return (
    <Box align="center" width={"75%"}>
        {/*<SliderWithTooltip*/}
        {/*    dots*/}
        {/*    min={0}*/}
        {/*    max={intervalArr.length -1}*/}
        {/*    marks={intervalArr}*/}
        {/*    disabled={false}*/}
        {/*    step={1}*/}
        {/*    onChange={onSliderValueChange}*/}
        {/*    value={interval}*/}
        {/*    // onAfterChange={value => this.props.MixValue(getValues(value))}*/}
        {/*/>*/}
        <Slider
            dots
            min={0}
            max={intervalArr.length -1}
            marks={intervalArr}
            step={1}
            onChange={onSliderValueChange}

        />
    </Box>
    )
}
