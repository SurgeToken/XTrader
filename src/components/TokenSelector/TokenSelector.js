import {FormField, Select} from "grommet";
import {useEffect, useState} from "react";
import {getAllContracts} from "../../common/contracts";

export default function TokenSelector() {
    const [tokens, setTokens] = useState([]);
    const [selectedToken, setSelectedToken] = useState(null);

    useEffect(() => {
        const allContracts = getAllContracts();
        setTokens(allContracts);
    }, []);

    return <FormField
        label="Surge"
        name="xToken"
        component={Select}
        onChange={(event) => console.log(event)}
        options={tokens.map(t => t.name)}
    />
}