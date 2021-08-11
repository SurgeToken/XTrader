import {Select} from "grommet";
import {useEffect, useState} from "react";
import {getAllContracts} from "../../common/contracts";

export default function TokenSelector({onSelect, defaultToken}) {
    const [tokens, setTokens] = useState([]);
    const [selectedToken, setSelectedToken] = useState(defaultToken);

    useEffect(() => {
        const allContracts = getAllContracts();
        setTokens(allContracts);
    }, []);

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