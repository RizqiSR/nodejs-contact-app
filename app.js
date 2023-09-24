const yargs = require("yargs"); // https://www.npmjs.com/package/yargs (in this lesson, we use 16.2.0 version)
const { simpanContact, listContact, detailContact } = require("./contacts");

// // 2. Cara 2 -> menggunakan parameter object :
yargs
  .command({
    command: "add",
    describe: "Menambahkan kontak baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email address",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor kontak",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      const contact = {
        nama: argv.nama,
        email: argv.email,
        noHP: argv.noHP,
      };
      // console.log(contact);
      simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand(); // menambahkan warning mencegah user yang sama sekali tidak mengirimkan command apapun

// Menambahkan daftar semua nama & no hp contact
yargs.command({
  command: "list",
  describe: "Menampilkan daftar semua nomor HP dan Nama Contacts",
  handler() {
    listContact();
    /* Output: 
      Daftar Kontak :
      RizqiSR: 082113125827
    */
  },
});

// Menampilkan detail sebuah kontak
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

yargs.parse();

// // 1. Cara 1 :
// yargs.command('command-nya apa', 'deskripsi command-nya', function untuk builder-nya, handler (mau ngapain))
// yargs.command(
//   "add",
//   "Menambahkan kontak baru",
//   () => {},
//   (argv) => {
//     console.log(argv.nama);
//   }
// );

// yargs.parse();
