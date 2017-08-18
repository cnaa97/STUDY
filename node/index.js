/**
 * Created by ParkJunHo on 19/05/2017.
 */

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./route/router');

const bodyParser = require('body-parser');

/**
 * extended
 * false : String, Object
 * true : Any Type available
 * 아래 router 보다 더 빨리 use 해주어야 함
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/**
 * using router
 */
app.use(router);


app.listen(port, err => {
    if (err) console.log(err);
    else console.log('server is running');
});