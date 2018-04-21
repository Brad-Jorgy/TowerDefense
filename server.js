let express = require('express');
let fs = require('fs');
let readLine = require('readline');
let app = express();

app.use(express.static('./Public/'));
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/index.html" );
});

app.get('/scores/:scoreFile', (req, res) => {
    let scores = {
        scoreList: [],

    };                                                               //:scoreFile is a parameter that comes in with the URL
    fs.stat(`scores/${ req.params.scoreFile}`, (err, stat) => {     // stat checks to see if file exists
        if (err === null) {
            const rl = readLine.createInterface({
                input: fs.createReadStream(`scores/${ req.params.scoreFile}`),
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                scores.scoreList.push(`${line}`);
            });

            rl.on('close', () => {
                res.json(scores.scoreList);
            });
        } else {

            res.status(500).send({ message: err.message });
        }
    })
});

app.post('/scoresIn/:scoreFile/:score', (req, res) => {
    fs.stat(`scores/${ req.params.scoreFile }`, (err, stat) => {
        if (err === null) {
            fs.appendFile(`scores/${ req.params.scoreFile }`, `${req.params.score}\n`, (err) => {
                if (err !== null) {
                    res.status(500).send({ message: err.message });
                }
                res.status(201);
            })
        } else {
            fs.writeFile(`scores/${ req.params.scoreFile }`, `${req.params.score}\n`, (err) => {
                if (err === null) {
                    res.status(201);
                }
            });
            res.status(500).send({ message: err.message });
        }
    })
});

let server = app.listen(5000, function () {
    let host = 'localhost'; //server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});