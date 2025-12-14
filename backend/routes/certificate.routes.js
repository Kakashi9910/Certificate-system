import { Router } from "express";
import { generateCertificate } from "../services/certificateService.js";
import { sendEmail } from "../services/emailService.js";

const router = Router();

router.post("/generate", async (req, res) => {
  try {
    const {
      name,
      email,
      gstNumber,
      businessName,
      businessAddress
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const files = await generateCertificate({
      name,
      gstNumber,
      businessName,
      businessAddress
    });

    await sendEmail({
      email,
      name,
      ...files
    });

    res.json({
      success: true,
      message: "Certificate generated and sent successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
