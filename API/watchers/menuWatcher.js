const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('../models/Menu');

module.exports = function menuWatcher() {

    console.log('Connected to MongoDB, setting up menu change stream...');

    const changeStream = MenuItem.watch();

    changeStream.on('change', (change) => {
        console.log('MenuItem change detected:', change);
    });

    console.log("Menu watcher running");
};