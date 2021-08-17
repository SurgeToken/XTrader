export async function getHistoricPriceData(tokenAddress) {
    // const response = await fetch(`https://api.getsur.ge/0xE1E1Aa58983F6b8eE8E4eCD206ceA6578F036c21?interval=1d`);
    const response = await fetch(`https://api.getsur.ge/${tokenAddress}?interval=1d`);
    const data = await response.json();
    try {
        console.log("data: ", data.dataset, " tokenAddress: ", tokenAddress);
        return data.dataset.map(point => {
            return { price: point[0], date: point[1] };
        });
    }catch (e) {
        console.error("couldnt get the chart data: ", e)
    }
}