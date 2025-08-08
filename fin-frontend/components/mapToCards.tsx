export const mapDataToCards = async () => {

    const allData = await fetch('http://localhost:5000/api/fi-mcp-all/allTools', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Mcp-session-Id': `mcp-session-${sessionStorage.getItem('userId')}`,
        },
    });

    // Parse the response as JSON
    const data = await allData.json();

    let json: { [key: string]: any } = {};
    json['fetch_net_worth'] = mapNetWorthCard(data?.data?.fetch_net_worth);
    return json;
};

function mapNetWorthCard(fetch_net_worth: any): any {
    // Implement your mapping logic here
    // const netWorthData = fetch_net_worth.netWorth.monthWise.map((entry: any) => ({
    //     month: entry.month,      // e.g., 'Jan'
    //     value: entry.total,      // net worth value for the month
    //   }));
      
    const fetch_net_worth_data = {
        netWorthValue: fetch_net_worth?.netWorthResponse?.totalNetWorthValue?.units,
        // percentage: getNetWorthChangePercent(fetch_net_worth),
        // netWorthData
    }

    console.log("Net worth data: ", fetch_net_worth_data)

    return fetch_net_worth_data; // Placeholder: return as-is for now
};

function getNetWorthChangePercent(fetch_net_worth: any): number {
    const current = fetch_net_worth.netWorth.total;
    const lastYear = fetch_net_worth.netWorth.lastYearTotal;

    if (!lastYear || lastYear === 0) return 0;

    const change = current - lastYear;
    const percentChange = (change / lastYear) * 100;

    return parseFloat(percentChange.toFixed(2));
}
