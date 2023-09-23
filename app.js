const yargs = require("yargs"); // https://www.npmjs.com/package/yargs (in this lesson, we use 16.2.0 version)
const { simpanContact } = require("./contacts");

// // 2. Cara 2 -> menggunakan parameter object :
yargs.command({
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
