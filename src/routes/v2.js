'use strict';

const express = require('express');

const { food } = require('../models/index');
const basicAuth = require('../auth/middleware/basic')
const bearerAuth = require('../auth/middleware/bearer')
const permissions = require('../auth/middleware/acl')
// const dataModules = {
//     'clothes': clothes,
//     'food': food,
// };

const v2Router = express.Router();

// v2Router.param('model', (req, res, next) => {
//     const modelName = req.params.model;
//     if (dataModules[modelName]) {
//         req.model = dataModules[modelName];
//         next();
//     } else {
//         next('Invalid Model');
//     }
// });

v2Router.get('/api/v2/food', basicAuth, handleGetAll);
v2Router.get('/api/v2/food/:id', basicAuth, handleGetOne);
v2Router.post('/api/v2/food', bearerAuth, permissions('create'), handleCreate);
v2Router.put('/api/v2/food/:id', bearerAuth, permissions('update'), handleUpdate);
v2Router.delete('/api/v2/food/:id',bearerAuth,permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
    let allRecords = await food.get();
    res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
    const id = req.params.id;
    let theRecord = await food.get(id)
    res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
    let obj = req.body;
    let newRecord = await food.create(obj);
    res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await food.update(id, obj)
    res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
    let id = req.params.id;
    let deletedRecord = await food.delete(id);
    res.status(200).json(deletedRecord);
}


module.exports = v2Router;
