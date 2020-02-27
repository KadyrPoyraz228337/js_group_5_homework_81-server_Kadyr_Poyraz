const express = require('express'),
    cors = require('cors'),

    mongoose = require('mongoose'),

    Link = require('./models/Link'),

    config = require('./config'),
    links = require('./app/links'),

    app = express();


app.use(cors());
app.use(express.json());

const run = async () => {
    await mongoose.connect('mongodb://localhost/links', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    app.get('/:shortUrl', async (req, res) => {
        const data = await Link.find({shortUrl: req.params.shortUrl});

        res.status(301).redirect(data[0].originalUrl);
    });

    app.use('/links', links);

    app.listen(config.port, () => {
        console.log(`server start on ${config.port} port!`);
    });
};

run().catch(e => {
    console.log('Error:', e);
});