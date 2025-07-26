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
    json['fetch_net_worth'] = mapNetWorthCard(data?.fetch_net_worth);
    return json;
};

function mapNetWorthCard(fetch_net_worth: any): any {
    // Implement your mapping logic here
    return fetch_net_worth; // Placeholder: return as-is for now
};

