const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 1. membuat folder data & data berformat JSON
const dirPath = "./data";
const filePath = "./data/contacts.json";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);

  fs.writeFileSync(filePath, "[]", "utf-8");
}

const pertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

const simpanContact = (nama, email, profesi) => {
  const contact = { nama, email, profesi }; // 1. buat variable yang memiliki value sebuah Object
  const fileJSON = fs.readFileSync(filePath, "utf-8"); // 2. buka file JSON yang sudah dibuat, dan ubah format ke dalam bentuk string (bukan lagi buffer)
  const contacts = JSON.parse(fileJSON); // 3. Ubah menjadi Javascript object/array of obejcts agar kita bisa memasukan data yang kita input ke data type string
  contacts.push(contact); // 4. karena contacts sudah berbentuk {} (object), maka kita bisa push data inputan ke dalam array contacts
  
  fs.writeFileSync(filePath, JSON.stringify(contacts)); // 5. karena fs.writeFileSync() hanya menerima argumen berbentuk String, maka jangan lupa untuk mengubah object (contacts) tadi menjadi menjadi string kembali. agar object tersebut bisa ditulis (di write) ke fileJSON yang kita buat sebelumnya

  console.log("Terimakasih data sudah berhasil dimasukan ke database");

  rl.close(); // akhiri pertanyaan
};

module.exports = { pertanyaan, simpanContact };
