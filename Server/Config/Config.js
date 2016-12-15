var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    test: {
        root: rootPath,
        app: { name: 'Chirps' },
        port: 3000,
        db: 'mongodb://127.0.0.1/chirp-test',
        secret: "crazyasselectionyear"

    },

    development: {
        root: rootPath,
        app: { name: 'Chirps'  },
        port: 5000,
        db: 'mongodb://127.0.0.1/chirp-dev',
        secret: "TheOnlyChoiceisJohnsonweld"
        
    },
    production: {
        root: rootPath,
        app: { name: 'Chirps' },
        port: 80,
        db: 'mongodb://127.0.0.1/chirp',
        secret: "ThenAgainYouCanAlwaysVoteClintonOrTrump..."
    }
};



module.exports = config[env];
