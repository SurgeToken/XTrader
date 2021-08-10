import {Box, Grommet} from "grommet";
import grommetTheme from "./themes/theme.json";
import Trade from "./components/NativeSurgeTrader"

function App() {
    return (
        <Grommet theme={grommetTheme}>
            <Box align="center" pad="large" border={{size: 'medium'}}>
                <Trade/>
            </Box>
        </Grommet>

    );
}

export default App;
