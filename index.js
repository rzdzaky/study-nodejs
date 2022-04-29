const yargs = require('yargs')
const { saveContact, listContact, detailContact, deleteContact } = require('./contacts')

// add contact
yargs.command({
  command: 'add',
  desc: 'New Contact',
  builder: {
    name: {
      describe: 'Fullname',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Email',
      demandOption: true,
      type: 'string'
    },
    phone: {
      describe: 'Phone',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv){
    saveContact(argv.name,argv.email,argv.phone)
  }
}).demandCommand()

// get contact
yargs.command({
  command: "list",
  desc: "Get Contact",
  handler(){
    listContact()
  }
})

yargs.command({
  command: "detail",
  desc: "Get Contact Detail by Name",
  builder: {
    name: {
      describe: 'Fullname',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    detailContact(argv.name)
  }
})

yargs.command({
  command: "delete",
  desc: "Delete Contact by Name",
  builder: {
    name: {
      describe: 'Fullname',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    deleteContact(argv.name)
  }
})

yargs.parse()