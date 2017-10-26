const admin = require('./firebase.admin');
const ref = admin.database().ref();
module.exports = ref;