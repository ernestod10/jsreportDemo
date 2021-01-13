function now() {
    return new Date().toLocaleDateString()
}

function nowPlus20Days() {
    var date = new Date()
    date.setDate(date.getDate() + 20);
    return date.toLocaleDateString();
}

function total(items) {
    var sum = 0
    items.forEach(function (i) {
        console.log('Calculating item ' + i.name + '; you should see this message in debug run')
        sum += (i.precio*i.unidades)
    })
    return sum
}
function final(precio, unidades) {
    return (precio * unidades);
}
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
