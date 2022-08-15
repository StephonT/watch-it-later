const seedUsers = require('./user-seeds');
const seedWatchlist = require('./watchlist-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUsers();
    console.log('--------------');

    await seedWatchlist();
    console.log('--------------');

    process.exit(0);
};

seedAll();
