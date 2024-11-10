const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const getCompanyQRCToken = async () => {
  const qrcUrl = process.env.QRC_URL;
  const qrcRealm = process.env.QRC_REALM;
  const qrcUname = process.env.COMPANY_QRC_UNAME;
  const qrcPass = process.env.COMPANY_QRC_PASS;

  const tokenUrl = `${qrcUrl}/auth/realms/${qrcRealm}/protocol/openid-connect/token`;

  console.log(tokenUrl);

  if (!qrcUname || !qrcPass) {
    console.error("Client ID or Client Secret is missing.");
    return null;
  }

  try {
    const params = new URLSearchParams();
    params.append("client_id", "IPH-Login");
    params.append("grant_type", "password");
    params.append("username", qrcUname);
    params.append("password", qrcPass);

    const response = await axios.post(tokenUrl, params);
    const accessToken = response.data.access_token;
    console.log(accessToken);

    return accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};

// const getPersonQRCToken = async () => {
//   const qrcUrl = process.env.person.QRC_URL;
//   const qrcRealm = process.env.person.QRC_REALM;
//   const qrcUname = process.env.person.QRC_UNAME;
//   const qrcPass = process.env.person.QRC_PASS;

//   const tokenUrl = `${qrcUrl}/auth/realms/${qrcRealm}/protocol/openid-connect/token`;

//   if (!qrcUname || !qrcPass) {
//     console.error("Client ID or Client Secret is missing.");
//     return null;
//   }

//   try {
//     const params = new URLSearchParams();
//     params.append("client_id", qrcUname);
//     params.append("grant_type", "client_credentials");
//     params.append("client_secret", qrcPass);

//     const response = await axios.post(tokenUrl, params);
//     const accessToken = response.data.access_token;
//     console.log(accessToken);

//     return accessToken;
//   } catch (error) {
//     console.error("Error fetching access token:", error);
//     throw error;
//   }
// };

module.exports = getCompanyQRCToken;
