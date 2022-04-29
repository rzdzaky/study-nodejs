const fs = require("fs")
const colors = require("colors")
const validator = require("validator")
const { exit } = require("process")

const dirPath = "./data"
const dataPath = `${dirPath}/contacts.json`

if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, "[]", "utf-8")

const saveContact = (name, email, phone) => {
  const contact = {
    name: name,
    email: email,
    phone: phone,
  }
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8")
  const contacts = JSON.parse(fileBuffer)

  const duplicate = contacts.find((contact) => contact.email === email)

  if (duplicate) return console.log(`${contact.email} telah terdaftar`.red.underline.bold)

  if (!validator.isEmail(contact.email)) return console.log(`\n${contact.email} tidak valid`.red.underline.bold)

  if (!validator.isMobilePhone(contact.phone, "id-ID")) return console.log(`\n${contact.phone} tidak valid / bukan nomor indonesia`.red.underline.bold)

  contacts.push(contact)

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts))

  console.log(`Data ${name} telah berhasil ditambahkan`.green.underline.italic)
  exit()
}

module.exports = { saveContact }
