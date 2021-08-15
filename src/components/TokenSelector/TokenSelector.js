import {Select} from "grommet";
import {useEffect, useState} from "react";
import state from "../../state/state"
import {useRecoilState} from "recoil";

export default function TokenSelector({onSelect, defaultToken}) {
    const [tokens, setTokens] = useState([]);
    const [selectedToken, setSelectedToken] = useState(defaultToken);
    const [holdings, ] = useRecoilState(state.walletHoldings);
    useEffect(() => {
        setTokens(Object.keys(holdings).map((key) => {return {name: key}}));

    }, [holdings]);

    const onTokenChange = ({ option }) => {
        setSelectedToken(option);

        if (onSelect) {
            onSelect(option);
        }
    };
    return <Select
        onChange={onTokenChange}
        options={tokens}
        value={selectedToken}
        labelKey="name"
    />
}
