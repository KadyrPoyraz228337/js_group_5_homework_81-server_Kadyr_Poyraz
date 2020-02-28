const express = require('express'),
    nanoid = require('nanoid'),

    router = express.Router(),

    Link = require('../models/Link');


const createLink = async data => {
    data.shortUrl = nanoid(6);

    const searchLink = await Link.find({
        shortUrl: data.shortUrl
    });

    if (searchLink[0]) {
        await createLink(data)
    } else {
        const link = new Link(data);
        await link.save();

        return link;
    }
};

router.post('/', async (req, res) => {
    const data = req.body;

    try {
        const link = createLink(data);
        res.send(link);
    } catch (e) {
        res.status(400).send(e);
    }

});

module.exports = router;