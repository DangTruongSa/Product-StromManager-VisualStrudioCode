const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fruitShema = new Schema({
    name: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    status: { type: Number },
    image: { type: Array },
    //image: { type: String },
    description: { type: String },
    id_distributor: {
        type: Schema.Types.ObjectId,
        ref: 'distributor'

    }
}, {
    timestamps: true
})
const fruit = mongoose.model('Fruit', fruitShema);
module.exports = fruit;