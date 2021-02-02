var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res) {
    console.log(req.body)
    let valueA = req.body.valueA;
    let valueB = req.body.valueB;

    let key = "Calc" + valueA + "to" + valueB;
    console.log(key);

    req.cache.hgetall(key, (err, data) => {
        console.log("값 들어오는지 check");
        if (err) console.log(err);
        if (data) {
            console.log(data)
            res.json({
                result: data.result,
                status: data.status,
            })
        } else if (data == null) {
            let value = Number.parseInt(valueA) + Number.parseInt(valueB);
            req.cache.hmset(key, {
                result: value,
                status: "cached",

            })
            res.json({
                result: value,
                status: "uncached",
            });

        }
    })
});

module.exports = router;
