const axios = require("axios");
const dotenv = require("dotenv");
const getCompanyQRCToken = require("./getQRCToken");

dotenv.config();

const getAccountAlias = async (aliasId) => {
  const qrcUrl = process.env.QRC_BASE_URL_DICT;
  const token = await getCompanyQRCToken();

  try {
    const response = await axios.get(
      `${qrcUrl}/api/v1/account-aliases/${aliasId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};

module.exports = getAccountAlias;
