import {Select} from "grommet";
import {useEffect, useState} from "react";
import state from "../../state/state"
import {useRecoilState, useRecoilValue} from "recoil";
import contracts from "../../contracts/contracts";

export default function AddressSelector({onSelect}) {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();
    // const symbols = Object.keys(contracts);
    useEffect(() => {
        const addressList = [];
        Object.keys(contracts).forEach(
            (key) => {
                contracts[key].prototype.getAddressOfContract().then((address) => {
                    let item = {};
                    item[key] = address
                    addressList.push(item);
                })

            }
        )
        setAddresses(addressList);
        setSelectedAddress(addresses.at(0))
        // for (let index in  symbols) {
        //     let symbol = symbols[index];
        //     contracts[symbol].prototype.getAddressOfContract().then((address) => {
        //         addresses[symbol] = address
        //     })
        // }
        // setAddresses(addresses);

    }, [setAddresses]);

    const onAddressChange = ({ option }) => {
        console.error("addresses: ", addresses, "selectedAddress: ", selectedAddress, "option: ", option);
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
