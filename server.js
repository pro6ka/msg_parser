const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/models');

if (process.env.NODE_ENV === 'dev') {
    db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });
} else {
    db.sequelize.sync();
}


require('dotenv').config();

const server = {
    app: express(),
    someString: 'some text',
    getPort: () => {
        return process.env.PORT;
    },
    run: () => {
        require('./app/routes/category.routes')(server.app);
        server.app.listen(server.getPort(), () => {
            console.log(`Server is running on port ${server.getPort()}`);
        })
    },
    routes: () => {
        server.app.get('/', (req, res) => {
            res.json({message: 'Welcome to parser application'});
        });
        return server;
    }
};

module.exports = server;
