var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
    let valueA = req.body.valueA;
    let velueB = req.body.valueB;
    
    let result = Number.parseInt(valueA) + Number.parseInt(velueB);
    console.log(result)
    res.json({result : result});
});

module.exports = router;
