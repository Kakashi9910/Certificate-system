import puppeteer from "puppeteer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCertificate = async (data) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = await ejs.renderFile(
    path.join(__dirname, "../templates/certificate.ejs"),
    data
  );

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfPath = path.join(
    __dirname,
    `../certificates/pdf/${data.name}.pdf`
  );
  const jpgPath = path.join(
    __dirname,
    `../certificates/jpg/${data.name}.jpg`
  );

  await page.pdf({ path: pdfPath, format: "A4" });
  await page.screenshot({ path: jpgPath, fullPage: true });

  await browser.close();

  return { pdfPath, jpgPath };
};
