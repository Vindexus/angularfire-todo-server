const Ref = require('../src/app/firebase/firebase-db')
const listService = require('../lib/list.service');


Ref.child('lists').on('value', (snap) => {
  console.log('snap.value', snap.val());
});

listService.addList('cli name');
