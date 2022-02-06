const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');

router.get('/', function getItems(req, res, next) {
    return res.json(items)
})

router.get('/:name', (req, res, next) => {
    try {
        let result = {};
        if (items.length) {
            for (let item of items) {
                if (item.name === req.params.name) {
                    result = item;
                }
            }
        }
        return res.json(result);
    } catch (e) {
        return next(e);
    }
})
router.post('/', (req, res, next) => {
    items.push(req.body);
    res.status(201).json({ "added": items[items.length - 1]});
    next();
})
router.patch('/:name', (req, res, next) => {
    let updatedItem = {};
    try{
        if (items.length) {
            for (let item of items) {
                if (item.name === req.params.name) {
                    item.name = req.body.name;
                    updatedItem = item;
                }
            }
        }
        console.log("This is from Patch " + items)
        return res.status(200).json({ "updated": updatedItem});
    }catch(e){
        return next(e);
    }
    
});
router.delete('/:name', (req, res, next) => {
    try{
        if (items.length) {
            for (let item of items) {
                if (item.name === req.params.name) {
                    items.pop(item)
                }
            }
        }
        return res.status(200).json({"message": "Deleted"});
    }catch(e){
        return next(e);
    }
    
});

module.exports = router;