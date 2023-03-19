const express = require('express')
const usersBLL = require('../BLL/usersBLL');


const router = express.Router();

/*Get all users */
router.route('/').get(async (req, res) => {
    const users = await usersBLL.getAllUsers();
    res.json(users);
});

module.exports = router;