const { addQuestion,saveContact } = require('./contacts')

const addData = async () => {
  const name = await addQuestion("Name: ")
  const email = await addQuestion("Email: ")
  const phone = await addQuestion("Phone: ")

  saveContact(name,email,phone)
}

addData()
