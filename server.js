let express = require('express');
let fs = require('fs');
let readLine = require('readline');
let bodyParser = require('body-parser');
let app = express();

app.use(express.static('./Public/'));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/index.html" );
});

app.get('/scores/:scoreFile', (req, res) => {                       //:scoreFile is a parameter that comes in with the URL
    fs.stat(`./scores/${ req.params.scoreFile}`, (err, stat) => {     // stat checks to see if file exists
        if (err === null) {
            const rl = readLine.createInterface({
                input: fs.createReadStream(req.params.scoreFile),
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                scoreList.push(line);
            });

            rl.on('close', () => {
                res.json(scoreList);
            });
        } else {

            res.status(500).send({ message: err.message });
        }
    })
});

app.post('/scoresIn', (req, res) => {
    fs.stat(`Public/scores/${ req.body.scoreFile }`, (err, stat) => {
        if (err === null) {
            fs.appendFile(req.body.scoreFile, req.body.addScore, (err) => {
                if (err !== null) {
                    res.status(500).send({ message: err.message });
                }
            })
        } else {
            fs.writeFile(`./scores/${ req.body.scoreFile}`, req.body.score, (err) => {
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