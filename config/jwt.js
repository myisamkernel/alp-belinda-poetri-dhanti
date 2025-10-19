const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; // Access token expires in 1 hour

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
};