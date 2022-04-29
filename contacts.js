const fs = require("fs")
const colors = require("colors")
const validator = require("validator")
const { exit } = require("process")

const dirPath = "./data"
const dataPath = `${dirPath}/contacts.json`

if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, "[]", "utf-8")

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8")
  const contacts = JSON.parse(fileBuffer)
  return contacts
}

const saveContact = (name, email, phone) => {
  const contact = {
    name: name,
    email: email,
    phone: phone,
  }

  const contacts = loadContact()

  const duplicate = contacts.find((contact) => contact.email === email)

  if (duplicate) return console.log(`${contact.email} telah terdaftar`.red.underline.bold)

  if (!validator.isEmail(contact.email)) return console.log(`\n${contact.email} tidak valid`.red.underline.bold)

  if (!validator.isMobilePhone(contact.phone, "id-ID")) return console.log(`\n${contact.phone} tidak valid / bukan nomor indonesia`.red.underline.bold)

  contacts.push(contact)

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts))

  console.log(`Data ${name} telah berhasil ditambahkan`.green.underline.italic)
}

const listContact = () => {
  const contacts = loadContact()

  contacts.forEach((contact,i) => {
    console.log(`${i+1}. ${contact.name} - ${contact.phone}`)
  });
}

const detailContact = (name) => {
  const contacts = loadContact()

  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  )

  if(!contact) return console.log(`\nData: ${name} tidak ditemukan`.red.underline.bold)

  console.log(`Data ditemukan:`.green.underline.italic.bold)
  console.log(contact.name)
  console.log(contact.email)
  console.log(contact.phone)
}

const deleteContact = (name) => {
  const contacts = loadContact()

  const newContacts = contacts.filter((contact) => {
    contact.name.toLowerCase() !== name.toLowerCase()
  })

  if(contacts.length === newContacts.length) return console.log(`\nData: ${name} tidak ditemukan`.red.underline.bold)

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts))

  console.log(`Data ${name} telah berhasil dihapus`.green.underline.italic)
}

module.exports = { saveContact, listContact, detailContact, deleteContact }
