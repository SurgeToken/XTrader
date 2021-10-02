import {Select} from "grommet";
import {useEffect, useState} from "react";
import state from "../../state/state"
import {useRecoilState, useRecoilValue} from "recoil";
import contracts from "../../contracts/contracts";

export default function AddressSelector({onSelect}) {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();
    const excludeArray = ["Useless"]
    // const symbols = Object.keys(contracts);
    useEffect(() => {
        const addressList = [];
        Object.keys(contracts).forEach(
            (key) => {
                try{
                    if (!excludeArray.includes(key)) {
                        contracts[key].prototype.getAddressOfContract().then((address) => {
                            addressList.push({name: key, address: address});
                        })
                    }
                } catch (e) {
                    // console.error("AddressSelector =>", e)
                }

            }
        )
        setAddresses(addressList);
        // setSelectedAddress(addresses.at(0));
        // for (let index in  symbols) {
        //     let symbol = symbols[index];
        //     contracts[symbol].prototype.getAddressOfContract().then((address) => {
        //         addresses[symbol] = address
        //     })
        // }
        // setAddresses(addresses);

    }, [setAddresses]);

    const onAddressChange = ({ option }) => {
        setSelectedAddress(option);
        if (onSelect) {
            onSelect(option.address);
        }
    };
    return <Select
        align-self={"stretch"}
        onChange={onAddressChange}
        options={addresses}
        value={selectedAddress}
        labelKey="name"
        valueKey="address"
    />
}
