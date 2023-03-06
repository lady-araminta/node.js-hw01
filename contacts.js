const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const findContact = data.find((contact) => contact.id === contactId);
  return findContact || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
