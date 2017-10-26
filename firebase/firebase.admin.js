const admin         = require('firebase-admin');
const configAdmin   = require('angularfire-todo-lib').firebase.configAdmin;
const config        = require('angularfire-todo-lib').firebase.config;

module.exports = admin.initializeApp({
  credential: admin.credential.cert(configAdmin),
  databaseURL: config.databaseURL
});