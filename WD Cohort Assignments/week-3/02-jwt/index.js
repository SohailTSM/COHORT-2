const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const z = require('zod');

function signJwt(username, password) {
  const emailSchema = z.string().email();
  const passwordSchema = z.string().min(6);
  const emailParse = emailSchema.safeParse(username);
  const passwordParse = passwordSchema.safeParse(password);
  if (emailParse.success == true && passwordParse.success == true) {
    return jwt.sign({ username }, jwtPassword);
  } else {
    return null;
  }
}

function verifyJwt(token) {
  try {
    jwt.verify(token, jwtPassword);
    return true;
  } catch (error) {
    return false;
  }
}

function decodeJwt(token) {
  const decoded = jwt.decode(token);
  return decoded ? true : false;
}

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
