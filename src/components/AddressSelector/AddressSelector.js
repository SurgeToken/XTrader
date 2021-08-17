import {Select} from "grommet";
import {useEffect, useState} from "react";
import state from "../../state/state"
import {useRecoilState, useRecoilValue} from "recoil";
import contracts from "../../contracts/contracts";

export default function AddressSelector({onSelect}) {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();
    const symbols = Object.keys(contracts);
    // console.error("defaultAddress: ", defaultAddress)
    useEffect(() => {
        for (let index in  symbols) {
            let symbol = symbols[index];
            contracts[symbol].prototype.getAddressOfContract().then((address) => {
                addresses[symbol] = address
                console.error("address: ", address)
            })
        }
        console.error("addresses: ", addresses)

        setAddresses(addresses);
    }, [contracts]);

    const onAddressChange = ({ option }) => {
        setSelectedAddress(option);
        if (onSelect) {
            onSelect(option);
        }
    };
    return <Select
        onChange={onAddressChange}
        options={addresses}
        value={selectedAddress}
        labelKey="name"
    />
}
