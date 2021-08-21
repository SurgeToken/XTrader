import {useEffect, useState} from "react";
import {getHistoricPriceData} from "../common/price";
import contracts from "../contracts/contracts";
import Chart from "./Chart";

export default function XPriceChart() {
    const [priceData, setPriceData] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getHistoricPriceData(contracts.SurgeBnb);
            setPriceData(data);
        })();
    }, []);

    return (
        <Chart data={priceData}/>
    );
}
