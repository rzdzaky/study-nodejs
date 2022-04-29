const yargs = require('yargs')
const { saveContact } = require('./contacts')

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
})

yargs.parse()