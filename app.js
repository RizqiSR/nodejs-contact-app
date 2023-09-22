const yargs = require('yargs')



const { pertanyaan, simpanContact } = require("./contacts");

// karena value dari namaQuestion & emailQuestion berbentuk Promise, maka gunakan async-await.
const addDataToContact = async () => {
  const nama = await pertanyaan("Masukkan nama anda: ");
  const email = await pertanyaan("Masukkan email anda: ");
  const profesi = await pertanyaan("Masukkan profesi anda: ");

  simpanContact(nama, email, profesi);
};

addDataToContact(); // terakhir, jalankan fungsi kita
