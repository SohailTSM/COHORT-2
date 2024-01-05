const zod = require('zod');

const profileSchema = zod.object({
  name: zod.string().min(1, { message: 'name is required' }),
  description: zod.string().min(1, { message: 'description is required' }),
  linkedIn: zod.string().min(1, { message: 'linkedIn url is required' }),
  twitter: zod.string().min(1, { message: 'twitter url is required' }),
  github: zod.string().min(1, { message: 'github url is required' }),
  interests: zod
    .array(zod.string().min(1, { message: 'Empty string in interest' }))
    .min(1, { message: 'interests is required' }),
});

module.exports = { profileSchema };
