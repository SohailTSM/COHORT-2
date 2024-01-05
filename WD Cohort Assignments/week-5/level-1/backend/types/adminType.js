const zod = require('zod');

const adminSchema = zod.object({
  username: zod.string().email({ message: 'usename must be an email' }),
  password: zod
    .string()
    .min(6, { message: 'password must be 6 characters long' }),
});

module.exports = { adminSchema };
