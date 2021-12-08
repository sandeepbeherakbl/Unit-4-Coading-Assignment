const app = require('./index');
const connect = require('./conf/dbs');

app.listen(3000, async function () {
    await connect();
    console.log('listening on port 3000');
})