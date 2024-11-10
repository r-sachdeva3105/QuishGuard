const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const getCompanyDTWToken = require("./api/getDTWToken");
const getCompanyQRCToken = require("./api/getQRCToken");
const getAccountAlias = require("./api/accountAliases");
const generateStaticQR = require("./api/qrCode");
const decodeStaticQR = require("./api/decodeQR");

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(cors({ origin: "http://localhost:5173" }));

// Endpoint to fetch the access token for Company DTW
app.get("/api/company/DTWToken", async (req, res) => {
  try {
    const accessToken = await getCompanyDTWToken();
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error("Error fetching DTW Token:", error);
    res.status(500).json({ error: "Failed to fetch DTW access token" });
  }
});

// Endpoint to fetch the access token for Company QRC
app.get("/api/company/QRCToken", async (req, res) => {
  try {
    const accessToken = await getCompanyQRCToken();
    res.json({ access_token: accessToken });
  } catch (error) {
    console.error("Error fetching QRC Token:", error);
    res.status(500).json({ error: "Failed to fetch QRC access token" });
  }
});

// Endpoint to fetch account alias by aliasId
app.get("/api/account-alias/:aliasId", async (req, res) => {
  const { aliasId } = req.params;

  try {
    const aliasData = await getAccountAlias(aliasId);
    res.json(aliasData);
  } catch (error) {
    console.error("Error fetching account alias:", error);
    res.status(500).json({ error: "Failed to fetch account alias" });
  }
});

app.post("/api/qrcode", async (req, res) => {
  const data = req.body;

  try {
    const qrCode = await generateStaticQR(data);
    res.json(qrCode);
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code data" });
  }
});

app.post("/api/decodeQR", async (req, res) => {
  const data = req.body;

  try {
    const qrData = await decodeStaticQR(data);
    res.json(qrData);
  } catch (error) {
    console.error("Error decoding QR code:", error);
    res.status(500).json({ error: "Failed to decode QR code" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
