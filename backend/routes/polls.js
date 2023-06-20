const express = require('express');
const { route } = require("express/lib/application");
const Poll = require('../models/poll');
const router = express.Router();

router.get('/', async (req, res) => {
    // res.send('Hello World');
    const polls = await Poll.find()
    res.json(polls)
});

module.exports = router;