var express = require('express');
const app = require('../app');
var router = express.Router();
var sumRouter = require('./sumab');

router.use('/sum', sumRouter);

router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;
