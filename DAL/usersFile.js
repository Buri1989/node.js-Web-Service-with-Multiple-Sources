const jf = require('jsonfile');

const file = 'data/persons.json';

const getAllPersons = () => {
    return jf.readFile(file)
};

module.exports = { getAllPersons };