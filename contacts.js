const fs = require("fs");
const chalk = require("chalk"); // https://www.npmjs.com/package/chalk (in this lesson, we use 4.2.0 version)
const validator = require("validator"); // https://www.npmjs.com/package/validator (in this lesson, we use 13.5.2 version)

// 1. membuat folder data & data berformat JSON
const dirPath = "./data";
const filePath = "./data/contacts.json";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);

  fs.writeFileSync(filePath, "[]", "utf-8");
}

const loadContact = () => {
  const fileJSON = fs.readFileSync(filePath, "utf-8"); // 2. buka file JSON yang sudah dibuat, dan ubah format ke dalam bentuk string (bukan lagi buffer)
  const contacts = JSON.parse(fileJSON); // 3. Ubah menjadi Javascript object/array of obejcts agar kita bisa memasukan data yang kita input ke data type string
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email: email || "", noHP }; // 1. buat variable yang memiliki value sebuah Object

  /* 
    ---! 2 baris ini dikeluarkan/diabstraksi ke luar fungsi simpanContact() agar bisa digunakan berulangkali di fungsi lain !---
    const fileJSON = fs.readFileSync(filePath, "utf-8"); // 2. buka file JSON yang sudah dibuat, dan ubah format ke dalam bentuk string (bukan lagi buffer)
    const contacts = JSON.parse(fileJSON); // 3. Ubah menjadi Javascript object/array of obejcts agar kita bisa memasukan data yang kita input ke data type string
  */
  const contacts = loadContact(); // 3. Ubah menjadi Javascript object/array of obejcts agar kita bisa memasukan data yang kita input ke data type string

  // Cek duplikat :
  const duplicate = contacts.find((contact) => contact.nama === nama);
  if (duplicate) {
    console.log(
      chalk.red.inverse.bold("Contact sudah terdaftar, gunakan nama lain!")
    );
    return false;
  }

  // Cek format email: gunakan module validator (validator)
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  // Cek no HP
  if (noHP) {
    if (!validator.isMobilePhone(noHP, "id-ID")) {
      console.log(chalk.red.inverse.bold("No HP tidak valid!"));
      return false;
    }
  }

  contacts.push(contact); // 4. karena contacts sudah berbentuk {} (object), maka kita bisa push data inputan ke dalam array contacts

  fs.writeFileSync(filePath, JSON.stringify(contacts)); // 5. karena fs.writeFileSync() hanya menerima argumen berbentuk String, maka jangan lupa untuk mengubah object (contacts) tadi menjadi menjadi string kembali. agar object tersebut bisa ditulis (di write) ke fileJSON yang kita buat sebelumnya

  console.log(
    chalk.green.inverse.bold(
      "Terimakasih data sudah berhasil dimasukan ke database"
    )
  );
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("Daftar Kontak :"));
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.nama}: ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.noHP);
  if (contact.email) {
    console.log(contact.email);
  }
};

module.exports = { simpanContact, listContact, detailContact };
