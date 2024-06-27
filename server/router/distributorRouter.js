const express = require('express');
const distributorModel = require('../model/distributor');
const app = express.Router();

//add
app.post('/distributor', async (req, res) => {
    const dis = new distributorModel(req.body);
    try {
        await dis.save();
        res.send(dis);
    } catch {
        res.status(500).send(error);
    }
});

//get

app.get('/distributor', async (req, res) => {
    const distributor = await (distributorModel.find({}));
    try {
        res.send(distributor);
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete

app.delete('/distributor/:id', async (req, res) => {
    await distributorModel.findByIdAndDelete(req.params.id, req.body);
    try {
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});


//update

app.put('/distributor/:id', async (req, res) => {
    try {
        await distributorModel.findByIdAndUpdate(req.params.id, req.body);
        await distributorModel.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});




module.exports = app;