const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const getCompanyDTWToken = async () => {
  const keycloakUrl = process.env.KEYCLOAK_URL;
  const keycloakRealm = process.env.KEYCLOAK_REALM;
  const clientId = process.env.COMPANY_CLIENT_ID;
  const clientSecret = process.env.COMPANY_CLIENT_SECRET;

  const tokenUrl = `${keycloakUrl}/auth/realms/${keycloakRealm}/protocol/openid-connect/token`;

  if (!clientId || !clientSecret) {
    console.error("Client ID or Client Secret is missing.");
    return null;
  }

  try {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "client_credentials");
    params.append("client_secret", clientSecret);

    const response = await axios.post(tokenUrl, params);
    const accessToken = response.data.access_token;
    console.log(accessToken);

    return accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};

// const getPersonDTWToken = async () => {
//   const keycloakUrl = process.env.person.KEYCLOAK_URL;
//   const keycloakRealm = process.env.person.KEYCLOAK_REALM;
//   const clientId = process.env.person.PERSON_CLIENT_ID;
//   const clientSecret = process.env.person.PERSON_CLIENT_SECRET;

//   const tokenUrl = `${keycloakUrl}/auth/realms/${keycloakRealm}/protocol/openid-connect/token`;

//   if (!clientId || !clientSecret) {
//     console.error("Client ID or Client Secret is missing.");
//     return null;
//   }

//   try {
//     const params = new URLSearchParams();
//     params.append("client_id", clientId);
//     params.append("grant_type", "client_credentials");
//     params.append("client_secret", clientSecret);

//     const response = await axios.post(tokenUrl, params);
//     const accessToken = response.data.access_token;
//     console.log(accessToken);

//     return accessToken;
//   } catch (error) {
//     console.error("Error fetching access token:", error);
//     throw error;
//   }
// };

module.exports = getCompanyDTWToken;
// module.exports = getPersonDTWToken;
