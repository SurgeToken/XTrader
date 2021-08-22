import {useState} from "react";
import Slider from "rc-slider";
import '../themes/rc-slider.css';
import {Box, Text} from "grommet";

export default function IntervalSlider({ defaultValue, onValueChange }) {
    const [value, setValue] = useState(defaultValue || 6);
    const intervalArr = ["1m", "5m", "15m", "1h", "6h", "12h", "1d", "3d"/*, "1w", "1mo"*/]
    const onSliderValueChange = (event) => {
        setValue(intervalArr[event]);

        if (onValueChange) {
            onValueChange(event);
        }
    };

    return <Box align="center" width={"75%"}>
        <Slider
            dots
            value={value}
            startPoint={6}
            min={0}
            max={intervalArr.length -1}
            step={1}
            onChange={onSliderValueChange}
        />
        <Text size="small">{value}</Text>
    </Box>
}
