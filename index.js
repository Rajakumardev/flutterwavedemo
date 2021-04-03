const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());


app.get('/verifypayment/:transid', (req, res) => {
    const url = `https://api.flutterwave.com/v3/transactions/${req.params.transid}/verify`;
    axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer FLWSECK_TEST-a61eca17c0908f6b799cd08d83574f0c-X'
        }
    }).then((response) => {
        if (response.data.status === "success") {
            console.log("res:", response.data);
            res.json({
                status: 'success',
                reference: req.params.transid,
                card: response.data.data.card
            });
        } else {
            res.json({
                status: 'failed',
                reference: req.params.transid
            });
        }
    }).catch((error) => {
        console.log(error);
        res.json({
            status: "failed"
        });
    });
});


app.get('/', (req, res) => {
    res.json({
        test: 'itworks'
    });
});

app.post('/paystackwebhook', (req, res) => {
    transactionLog.push(req.body);
    res.send(200);
});

app.get('/transactionlog', (req, res) => {
    res.json({ transactionLog });
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log('server started');
})