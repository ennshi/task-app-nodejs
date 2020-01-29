const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

// router.get('/users', auth, (req, res) => {
//     User.find({}).then((users) => {
//         res.send(users);
//     }).catch((e) => {
//         res.status(500).send();
//     });
// });

// router.get('/users/:id', (req, res) => {
//     const _id = req.params.id;
//     User.findById(_id).then((user) => {
//         if(!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     }).catch((e) => {
//         res.status(500).send();
//     });
// });

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
       const user = await User.findByCredentials(req.body.email, req.body.password);
       const token = await user.generateAuthToken();
       res.send({user, token});
    } catch(e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const reqUpdates = Object.keys(req.body);
    const isValidUpdate = reqUpdates.every((field) => allowedUpdates.includes(field));
    if(!isValidUpdate) {
        return res.status(400).send({error: "Invalid updates"});
    }
    try {
        // const user = await User.findById(req.params.id);
        reqUpdates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch(e) {
        res.status(400).send();
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;
