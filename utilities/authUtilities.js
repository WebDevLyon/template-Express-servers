const GoogleAuth = require("./google")
const jwt = require("jsonwebtoken");
require('dotenv').config();


const handleLogin = async (userInformations, userInfo) => {
  const { email, password } = userInformations;
  if (email === userInfo.email && password === userInfo.password) {
    const token = jwt.sign({ email: userInfo.email, name: userInfo.name }, process.env.SECRET_KEY);
    return { token, email: userInfo.email, name: userInfo.name };
  } else {
    throw new Error("Invalid email or password");
  }
};

const handleGoogleLogin = async (userInformations, userInfo) => {
  const googleAuth = new GoogleAuth(userInformations.credential);
  try {
    const data = await googleAuth.verifyToken();
    if (data.payload.sub === userInfo.idGoogle) {
      const token = jwt.sign({ email: userInfo.email, name: userInfo.name }, process.env.SECRET_KEY);
      return { token, email: userInfo.email, name: userInfo.name };
    } else {
      throw new Error("Invalid Google user ID");
    }
  } catch (error) {
    throw new Error("Failed to verify Google token");
  }
};

// Export
module.exports = {
  handleLogin,
  handleGoogleLogin,
};