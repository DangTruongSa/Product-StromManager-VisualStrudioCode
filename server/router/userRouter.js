const express = require('express');
const UserModel = require('../model/user');
const bcryptjs = require('bcryptjs');

const app = express.Router();

//add user
app.post("/user", async (req, res) => {
    const { fullname, email, password, phone, address } = req.body;
    console.log(password);
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    console.log(hashPassword);

    const users = new UserModel({ fullname, email, password: hashPassword, phone, address });
    try {
        await users.save();
        res.send(users);
    } catch {
        res.status(500).send(error);
    }
});

//get user
app.get('/user', async (req, res) => {
    const users = await (UserModel.find({}));
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/user/:id', async (req, res) => {
    const users = await (UserModel.findById(req.params.id, req.body));
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

//update user

app.put('/user/:id', async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.params.id, req.body);
        await UserModel.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete user

app.delete('/user/:id', async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id, req.body);
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

//login 


app.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.sendStatus(401);
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.sendStatus(401);
        }
        delete user._doc.password;
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = app;
