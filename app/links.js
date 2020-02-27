const express = require('express'),
    nanoid = require('nanoid'),

    router = express.Router(),

    Link = require('../models/Link');

router.post('/', async (req, res) => {
    const data = req.body;
    data.shortUrl = nanoid(5);

    try {
        const item = await Link.find({
            originalUrl: data.originalUrl
        });
        const link = new Link(data);

        if (item[0]) return res.send(item[0]);

        await link.save();

        res.send(link);
    } catch (e) {
        res.send(e);
    }


});

module.exports = router;