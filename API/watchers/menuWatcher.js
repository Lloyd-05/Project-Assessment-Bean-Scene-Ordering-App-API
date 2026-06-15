/*Importing required files from other folds or node modules*/
const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('../models/Menu');

module.exports = function menuWatcher() { // Function to set up a change stream watcher for the Menu collection

    console.log('Connected to MongoDB, setting up menu change stream...'); //Log message to indiciate the watcher is being setup

    const changeStream = MenuItem.watch(); // Create a change stream on the Menu collection to listen for changes

    changeStream.on('change', (change) => { // Event listener for when a change is detected in the Menu collection
        console.log('MenuItem change detected:', change); // Log the change that was detected in the Menu collection
    });

    console.log("Menu watcher running"); //Log message to indicate the menu watcher is running
};