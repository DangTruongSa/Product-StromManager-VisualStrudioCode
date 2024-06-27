const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const distributors = new Schema(
    {
        name: { type: String },
    }, {
    timestamps: true
});

module.exports = mongoose.model('distributors', distributors);