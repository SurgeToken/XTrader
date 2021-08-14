export async function getHistoricPriceData(token) {
    const response = await fetch(`https://api.getsur.ge/${token.address}?interval=1d`);
    const data = await response.json();
    return data.dataset.map(point => {
        return { price: point[0], date: point[1] };
    });
}