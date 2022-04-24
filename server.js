const express = require('express');
const minimist = require('miniimist');
const app = express();

const args = minimist(process.argv.slice(2));


const HTTP_PORT = args["port"] || 50000;

const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
});

app.use(function (req, res) {
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });
app.get('/app/flip/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    
    const result = coinFlip();

    if (result === "heads"){
        res.json({"flip":"heads"});
    } else{
        res.json({"flip":"tails"});
    }

});

app.get('/app/flips/:number', (req, res) => {
    
    const result = coinFlips(req.params.number);

    res.status(200).json({"raw": result, "summary": countFlips(result)})
})

app.get('/app/flip/call/heads', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK'

    const result = flipACoin('heads');

    res.json(result)

})

app.get('/app/flip/call/tails', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK'

    const result = flipACoin('tails');

    res.json(result)
})



//functions

function coinFlip() {
    const result = Math.random();
    if (result < .5) {
        return "heads";
    } else {
        return "tails";
    }
}

function coinFlips(flips) {
    const results = [];

    for (let i = 0; i < flips; i++) {
        results[i] = coinFlip();
    }
    return results;
}

function countFlips(array) {
    var tailCount = 0;
    var headCount = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] === "heads") {
            headCount++;
        } else {
            tailCount++;
        }
    }
    return "{ tails: " + tailCount + ", heads: " + headCount + " }";

}

function flipACoin(call) {
    const num = coinFlip();

    if (num === call) {
        return " call: " + call + ", flip: " + call + ", result: 'win'";
    } else {
        return " call: " + call + ", flip: " + num + ", result: 'lose'";
    }
}