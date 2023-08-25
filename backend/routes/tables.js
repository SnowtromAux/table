const router = require('express').Router();
let Table = require('../models/table.model');

router.route('/').get((req, res) => {
    Table.find()
        .then(tables => res.json(tables))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route('/add').post((req , res) => {
    const rows = req.body.rows;
    const columns = req.body.columns;
    const hasSelected = req.body.hasSelected;
    const selectedRow = req.body.selectedRow;
    const selectedColumn = req.body.selectedColumn;

    const newTable = new Table({rows , columns , hasSelected , selectedRow , selectedColumn});

    newTable.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json("Error: " + err));
})

module.exports = router;