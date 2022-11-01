const pdfGenerator = require("pdfkit");
const fs = require("fs");

class PDFGenerator {
  constructor(file) {
    this.file = file;
  }
  generateHeader(doc) {
    let SchoolAddressDetail = {
      name: "Dschool",
      address: "256 MA, Wallmart Street, LA",
      city: "LA",
      country: "USA",
      pincode: "98520",
    };
    doc
      .fillColor("#000")
      .fontSize(20)
      .text("WELCOME TO DSCHOOL", 275, 50, { align: "left" })
      .fontSize(10)
      .text(`SchoolCode: N150230`, { align: "right" })
      .text(`SINCE: 1865`, { align: "right" })
      .moveDown()
      .text(
        `School Address:\n ${SchoolAddressDetail.name}\n${SchoolAddressDetail.address}\n${SchoolAddressDetail.city}\n${SchoolAddressDetail.state},${SchoolAddressDetail.country}, ${SchoolAddressDetail.postalCode}`,
        { align: "right" }
      );

    const beginningOfPage = 50;
    const endOfPage = 550;

    doc.moveTo(beginningOfPage, 200).lineTo(endOfPage, 200).stroke();

    doc.text(`Memo: M2309844`, 50, 210);

    doc.moveTo(beginningOfPage, 250).lineTo(endOfPage, 250).stroke();
  }
  generateFooter(doc) {
    doc.fontSize(10).text(`Digital School.`, 52, 150, {
      align: "center",
    });
  }

  generate() {
    const theOutPut = new pdfGenerator();
    let x = Math.floor(Math.random() * 100 + 1);
    theOutPut.pipe(fs.createWriteStream("./public/user_upload/fileDownload" + x + ".pdf"));
    this.generateHeader(theOutPut);
    theOutPut.moveDown();
    this.generateFooter(theOutPut);
    theOutPut.end();
    console.log("into the generte pdf from done!!!!");
    return "public/user_upload/fileDownload" + x + ".pdf";
  }
}

module.exports = PDFGenerator;
