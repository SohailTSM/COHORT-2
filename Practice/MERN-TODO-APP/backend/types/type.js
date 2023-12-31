const zod = require("zod");

const userSchema = zod.object({
  username: zod.string().email({ message: "username must be an email" }),
  password: zod
    .string()
    .min(6, { message: "password should be greater than 6 characters" }),
});

const todoSchema = zod.object({
  title: zod.string().min(1, { message: "Title is a required field" }),
  description: zod
    .string()
    .min(1, { message: "Description is a required field" }),
});

module.exports = { userSchema, todoSchema };
