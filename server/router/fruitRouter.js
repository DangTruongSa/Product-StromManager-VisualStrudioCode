const express = require('express');
const FruitModel = require('../model/fruit');
const upload = require('./upload');

const app = express.Router();



//add

app.post('/fruit', async (req, res) => {
    const dis = new FruitModel(req.body);
    try {
        await dis.save();
        res.send(dis);
    } catch {
        res.status(500).send(error);
    }
});

//get

app.get('/fruit', async (req, res) => {
    const distributor = await (FruitModel.find({}));
    try {
        res.send(distributor);
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete

app.delete('/fruit/:id', async (req, res) => {
    await FruitModel.findByIdAndDelete(req.params.id, req.body);
    try {
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

//update

app.put('/fruit/:id', upload.array('image', 5), async (req, res) => {
    try {
        const fruitId = req.params.id;
        const data = req.body;
        const { files } = req;

        // Lấy thông tin cũ của loại trái cây
        const oldFruit = await FruitModel.findById(fruitId);
        if (!oldFruit) {
            return res.status(404).send('Không tìm thấy loại trái cây');
        }

        // Lưu các ảnh mới được tải lên và cập nhật lại trường image


        const urlsImg = files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
        // Tiếp tục xử lý dữ liệu ở đây
        await FruitModel.findByIdAndUpdate(fruitId, {
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: urlsImg,
            description: data.description,
            id_distributor: data.id_distributor
        });
        res.send('Loại trái cây đã được cập nhật thành công');
    } catch (error) {
        console.error('Lỗi khi cập nhật loại trái cây:', error);
        res.status(500).send('Đã xảy ra lỗi khi cập nhật loại trái cây');
    }
});


app.post('/add-fruit', upload.array('image', 5), async (req, res) => {
    //Upload.array('image',5) => up nhiều file tối đa là 5
    //upload.single('image') => up load 1 file 
    try {

        const data = req.body;
        const { files } = req
        const urlsImg =
            files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`)

        const newFruit = new FruitModel({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: urlsImg,
            description: data.description,
            id_distributor: data.id_distributor
        });

        const result = await newFruit.save();


        if (result) {
            res.json({
                "status": 200,
                "message": "them thanh cong",
                "data": result
            })
        } else {
            res.json({
                "status": 200,
                "message": "khong thanh cong",
                "data": []
            })
        }
    } catch (error) {

        res.status(500).send(error);
    }
});

module.exports = app;