const readline = require("readline")
const fs = require("fs")
const colors = require("colors")
const { exit } = require("process")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const dirPath = "./data"
const dataPath = `${dirPath}/contacts.json`

if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)

if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, "[]", "utf-8")

const addQuestion = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (nama) => {
      resolve(nama)
    })
  })
}

const saveContact = (name,email,phone) => {
  const contact = {
    name: name,
    email: email,
    phone: phone,
  }
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8")
  const contacts = JSON.parse(fileBuffer)

  contacts.push(contact)

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts))

  console.log(`Data ${name} telah berhasil ditambahkan`.green.underline.italic)
  exit()
}

module.exports = {addQuestion,saveContact}