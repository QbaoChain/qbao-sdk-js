var express = require('express');
const qbaojs = require("./qbao");
var app = express();
app.use(express.json());

app.get('/newAddress', function (req, res) {
    try {
        console.log('creating address, account index:', req.query.account_index);
        var address = qbaojs.newAddress(req.query.account_index);
        console.log('creating result:', address);
        res.json({
            "result": "success",
            "address": address
        });
    } catch (e) {
        console.log("newAddress error", e);
        res.json({
            "result": "fail"
        })
    }
})

app.post('/transfer', function (req, res) {
    qbaojs.transfer(req.body.from, req.body.to, req.body.amount, req.body.account_index, req.body.is_withdraw).then(data => {
        res.json(data);
    }, err => {
        console.log("transfer error", err);
        res.json({
            "result": "fail"
        })
    }).catch(err=>{
        console.log("transfer catch error", err);
        res.json({
            "result": "fail"
        })
    })
})

var server = app.listen(5100, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("server start: http://%s:%s", host, port)

})
