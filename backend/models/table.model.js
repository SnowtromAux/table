const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tableSchema = new Schema({
    rowsNumber: Number,
    columnsNumber: Number,
    hasSelected: Boolean,
    selectedRow: Number,
    selectedColumn: Number
})

const Table = mongoose.model('Table' , tableSchema);
module.exports = Table;