import puppeteer from "puppeteer";
import ejs from "ejs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCertificate = async (data) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu"
    ]
  });

  const page = await browser.newPage();

  const html = await ejs.renderFile(
    path.join(__dirname, "../templates/certificate.ejs"),
    data
  );

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfDir = path.join(__dirname, "../certificates/pdf");
  const jpgDir = path.join(__dirname, "../certificates/jpg");

  fs.mkdirSync(pdfDir, { recursive: true });
  fs.mkdirSync(jpgDir, { recursive: true });

  const safeName = data.name.replace(/[^a-z0-9]/gi, "_").toLowerCase();

  const pdfPath = path.join(pdfDir, `${safeName}.pdf`);
  const jpgPath = path.join(jpgDir, `${safeName}.jpg`);

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true
  });

  await page.screenshot({
    path: jpgPath,
    fullPage: true
  });

  await browser.close();

  return { pdfPath, jpgPath };
};
