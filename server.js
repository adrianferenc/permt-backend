const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const permitControllers = require('./src/utilities');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.get('/test', function (req, res) {
    console.log('someone has hit the /test endpoint');
    permitControllers.viewPermits().then((permitList) => {
        res.status(200).set('Content-Type', 'text/html').send(Buffer.from(permitList));
    });
});

app.post('/', function (req, res) {
    console.log(`someone has made a post request with plate ${req.body?.plateNo || 'N/A'}`);
    if ('plateNo' in req.body) {
        permitControllers.buyAPermit(req.body.plateNo).then((success) => {
            console.log('suc', success);
            if (success) {
                res.status(200).json({ working: true });
            } else {
                res.status(400).json({ working: false });
            }
        });
    } else {
        res.status(401).json({ working: false });
    }
});

// Listen on port 4000
app.listen(port, function () {
    console.log(`Listening on port: ${port}`);
});
