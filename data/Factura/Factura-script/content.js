// server side script fetching remote data and preparing report data source
const https = require('https');

// call remote http rest api
function fetchFactura() {
    return new Promise((resolve, reject) => {
        https.get('https://jsonplaceholder.typicode.com/albums',
        (result) => {
            var str = '';
            result.on('data', (b) => str += b);
            result.on('error', reject);
            result.on('end', () => resolve(JSON.parse(str).value));
        });
    })
}

// group the data for report
async function prepareDataSource() {
    const orders = await fetchFactura()
    const ordersByShipCountry = orders.reduce((a, v) => {
        a[v.ShipCountry] = a[v.ShipCountry] || []
        a[v.ShipCountry].push(v)
        return a
    }, {})
}

// add jsreport hook which modifies the report input data
async function beforeRender(req, res) {
    req.data.orders = await prepareDataSource()
}