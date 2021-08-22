import {Select} from "grommet";
import {useEffect, useState} from "react";
import state from "../../state/state"
import {useRecoilState, useRecoilValue} from "recoil";

export default function TokenSelector({onSelect, defaultToken}) {
    const [tokens, setTokens] = useState([]);
    const [selectedToken, setSelectedToken] = useState(defaultToken);
    const [holdings, ] = useRecoilState(state.walletHoldings);
    useEffect(() => {
        const tokenList = [];
        Object.keys(holdings).forEach(
            (key) => {
                if (key !== 'BNB') {
                    tokenList.push({name: key});
                }
            }
        )
        setTokens(tokenList);

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
