const usersWS = require('../DAL/usersWS');
const usersFile = require('../DAL/usersFile');
const User = require('../models/userModel');

const getAllUsers = async () => {
    const usersData = [];

    // Get all data from web service
    const { data: usersWeb } = await usersWS.getAllUsers();

    // Get all data from json file
    const { persons: personsFile } = await usersFile.getAllPersons();

    // Get all data from db
    const usersDB = await User.find({});

    personsFile.forEach((per) => {
        const obj = {
            id: per.id,
            phone: per.phone,
        };

        const userWeb = usersWeb.find((user) => user.id === obj.id);
        obj.name = userWeb.name;
        obj.email = userWeb.email;

        const userDB = usersDB.find((user) => user.externalId === obj.id);
        obj.address = {
            city: userDB.city,
            country: userDB.country,
        };

        usersData.push(obj);
    });

    return usersData;
};

module.exports = { getAllUsers };
