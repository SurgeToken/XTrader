import {useState} from "react";
import Slider from "rc-slider";
import '../themes/rc-slider.css';
import {Box, Text} from "grommet";

export default function TokenAmountSlider({ defaultValue, onValueChange }) {
    const [value, setValue] = useState(defaultValue || 0);

    const onSliderValueChange = (event) => {
        setValue(event);

        if (onValueChange) {
            onValueChange(event);
        }
    };

    return <Box align="center" width={"75%"}>
        <Slider
            dots
            value={value}
            min={0}
            max={100}
            step={25}
            onChange={onSliderValueChange}
        />
        <Text size="small">{value}%</Text>
    </Box>
}
