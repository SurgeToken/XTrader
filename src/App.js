import logo from './logo.svg';
import {Box, Grommet} from "grommet";
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider";
import grommetTheme from "./themes/theme.json";
import Web3 from "web3";
import Trade from "./components/NativeSurgeTrader"

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
            options: {
            infuraId: "INFURA_ID" // required
        }
    }
};

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
});



// const provider = web3Modal.connect();

// const web3 = new Web3(provider);

function App() {
  return (
      <Grommet theme={grommetTheme}>
          <Box align="center" pad="large" border={{ size: 'medium' }}>
              <Trade/>
          </Box>
      </Grommet>

  );
}

export default App;
