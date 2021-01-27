const functions = require('firebase-functions');
//const express = require('express');
//const cors = require('cors');

//var fetch = require('node-fetch');
var cron = require('node-cron');

const admin = require('firebase-admin');
admin.initializeApp();

cron.schedule('* * * * *', () => {
    sendPushReminder();
  });

function sendPushReminder() {
    var currentDay = new Date()
    if (currentDay.getDay != 6 || currentDay.getDay != 6) {
        console.log(currentDay)
        console.log('running a task every hour');
    }
}
