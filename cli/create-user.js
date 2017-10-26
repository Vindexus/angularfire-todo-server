const colors          = require('colors');
const ArgumentParser  = require('argparse').ArgumentParser;

const todoLib         = require('angularfire-todo-lib');

const fbAdmin         = require('../firebase/firebase.admin');
const fbAdminRef      = require('../firebase/firebase.admin.ref');
const fbUtil          = todoLib.firebase.util;

const parser = new ArgumentParser({
  addHelp:true,
  description: 'For adding a user to the app.'
});
parser.addArgument(
  [ '-e', '--email' ]
);
parser.addArgument(
  [ '-u', '--username' ]
);
parser.addArgument(
  [ '-p', '--password' ]
);

function die (errs) {
  errs = errs || [];

  if(typeof(errs.forEach) != 'function') {
    errs = [errs];
  }

  errs.forEach((err) => {
    console.log('Error: '.red + err.toString());
  });
  process.exit();
}

let args = parser.parseArgs();

let errors = [];
if(!args.email || args.email.indexOf('@') == -1) {
  errors.push('Invalid email')
}

if(!args.password) {
  errors.push('Invalid password');
}

if(!args.username) {
  errors.push('Invalid username');
}

if(errors.length > 0) {
  return die(errors);
}

fbAdmin.auth().createUser({
  email: args.email,
  password: args.password,
  displayName: args.username,
})
.then(function(userRecord) {
  // See the UserRecord reference doc for the contents of userRecord.
  console.log("Successfully created new user account:", userRecord.uid);

  const usersRef = fbAdminRef.child('users/' + userRecord.uid);
  const cleanSave = fbUtil.cleanSave({
    username: userRecord.displayName,
    email: userRecord.email,
    uid: userRecord.uid
  });
  return usersRef.set(cleanSave)
    .then(() => {
      console.log('User added!'.green);
      process.exit();
    })
    .catch((err) => {
      console.log('JSON.stringify(err)',JSON.stringify(err));
      return die(err);
      //process.exit();
    });
})
.catch(function(error) {
  console.log('nay');
  return die(error);
  //process.exit();
});