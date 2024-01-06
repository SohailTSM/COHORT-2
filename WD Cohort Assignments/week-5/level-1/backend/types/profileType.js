const zod = require('zod');

const profileSchema = zod.object({
  name: zod
    .string({ required_error: 'name is required' })
    .min(1, { message: 'name is required' }),
  description: zod
    .string({ required_error: 'description is required' })
    .min(1, { message: 'description is required' }),
  linkedIn: zod
    .string({ required_error: 'linkedIn url is required' })
    .min(1, { message: 'linkedIn url is required' }),
  twitter: zod
    .string({ required_error: 'twitter url is required' })
    .min(1, { message: 'twitter url is required' }),
  github: zod
    .string({ required_error: 'github url is required' })
    .min(1, { message: 'github url is required' }),
  interests: zod
    .string({ required_error: 'interests url is required' })
    .min(1, { message: 'interests url is required' }),
});

module.exports = { profileSchema };
