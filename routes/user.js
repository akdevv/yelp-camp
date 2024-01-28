// imports
const express = require('express');
const User = require('../models/user');

// create router instance
const router = express.Router({ mergeParams: true });

//********************** USER ROUTES ***********************//

// register routes
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    res.send(req.body);
});

// export router
module.exports = router;