const axios = require("axios");
const dotenv = require("dotenv");
const getCompanyQRCToken = require("./getQRCToken");

dotenv.config();

const decodeStaticQR = async (data) => {
  try {
    const qrcUrl = process.env.QRC_BASE_URL_QR;
    const token = await getCompanyQRCToken();

    const response = await axios.post(
      `${qrcUrl}/api/v1/qrcodes/decoder`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("QR Code Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error decoding QR code:", error);
    throw error;
  }
};

module.exports = decodeStaticQR;
