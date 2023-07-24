const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;

const issueJWT = (admin) => {
  const _id = admin._id;

  const expiresIn = "1 d";

  const payload = {
    sub: _id,
  };

  const signedToken = jsonwebtoken.sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

module.exports = { issueJWT };
