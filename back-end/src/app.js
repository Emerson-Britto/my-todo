const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
require('dotenv').config();
require('./onStartup');

const PORT = process.env.PORT || config.get('api.port');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    console.log('----------------------------');
    console.log('NEW REQUEST: ' + req.url);
    console.log('DATE: ' + new Date());
    console.log('----------------------------');
    next();
})

app.get('/', (req, res) => {
    res.json({
        title: '!nordly-API',
        author: 'Emerson-Britto',
        description: "Base API for managing accounts from other projects"
    })
})

const accountRouter = require('./routers/account');
app.use('/msk/account', accountRouter);

app.listen(PORT, () => {
    console.log('Started: ' + new Date())
    console.log('port: ' + PORT)
})
