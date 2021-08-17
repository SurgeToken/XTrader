import {Select} from "grommet";
import {useEffect, useState} from "react";
import state from "../../state/state"
import {useRecoilState, useRecoilValue} from "recoil";
import contracts from "../../contracts/contracts";

export default function AddressSelector({onSelect, defaultAddress}) {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
    const symbols = Object.keys(contracts);
    // console.error("defaultAddress: ", defaultAddress)
    useEffect(() => {
        const addressList = [];
        Object.keys(contracts).forEach(
            (key) => {
                contracts[key].prototype.getAddressOfContract().then((address) => {
                    // console.log("key: ", key, "| contract: ", contracts[key], "| address: ", address)
                    let item = {};
                    item[key] = address
                    addressList.push(item);
                })

            }
        )
        // console.error("addressList: ", addressList)
        setAddresses(addressList);
        // for (let index in  symbols) {
        //     let symbol = symbols[index];
        //     contracts[symbol].prototype.getAddressOfContract().then((address) => {
        //         addresses[symbol] = address
        //         console.error("address: ", address)
        //     })
        // }
        // // console.error("addresses: ", addresses)
        // //
        // setAddresses(addresses);
        // console.error("addresses: ", addresses)

    }, [selectedAddress]);

    const onAddressChange = ({ option }) => {
        console.error("addresses: ", addresses, "selectedAddress: ", selectedAddress, "option: ", option);
        // console.error(addresses.map(token => {
        //     return { name: token[0], address: token[1] };
        // }));
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
