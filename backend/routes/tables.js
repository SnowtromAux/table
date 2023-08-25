const router = require('express').Router();
let Table = require('../models/table.model');

router.route('/').get((req, res) => {
    Table.find()
        .then(tables => res.json(tables))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route('/update/:id').post((req , res) => {
    Table.findById(req.params.id)
        .then(table => {
            table.rowsNumber = req.body.rowsNumber;
            table.columnsNumber = req.body.columnsNumber;
            table.selectedRow = req.body.selectedRow;
            table.selectedColumn = req.body.selectedColumn;
            
            table.save()
                .then(() => res.json('Table Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;