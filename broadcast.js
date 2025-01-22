const wppconnect = require("@wppconnect-team/wppconnect");
const ExcelJS = require("exceljs");

wppconnect
  .create({ session: "hore" })
  .then((client) => start(client))
  .catch((error) => console.log(error));

async function start(client) {
  const filePath = "kontak.xlsx";
  const sheetName = "Sheet1";

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.getWorksheet(sheetName);

  const contacts = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const name = row.getCell(1).value;
      const number = "62" + row.getCell(2).value;
      const message = row.getCell(3).value;
      // const message = "Halo gaes, ini pesan otomatis";
      contacts.push({ name, number, message });
    }
  });

  function delayExec(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function sendMessagesWithDelay() {
    for (const contact of contacts) {
      console.log("Kirim ke:", contact.name);
      try {
        await client.sendText(contact.number, contact.message);
        console.log("Result: success");
      } catch (error) {
        console.log(`Failed to send message to ${contact.name}:`, error);
      }
      await delayExec(2000);
    }
  }

  sendMessagesWithDelay();
}

// Format File Excel

// | Nama | Nomor HP |
// | --- | --- |
// | Saad | 8587737288 |
// | Fauzi | 85877838899 |

// Pastikan:

// 1. File Excel bernama kontak.xlsx.
// 2. Sheet bernama Sheet1.
// 3. Kolom A berisi nama kontak.
// 4. Kolom B berisi nomor HP kontak.

// Perbarui path file Excel dan nama sheet sesuai kebutuhan Anda.
