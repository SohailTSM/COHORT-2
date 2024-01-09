const profileRouter = require('express').Router();
const { Profile } = require('../database/profileModel');
const { profileSchema } = require('../types/profileType');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

profileRouter.get('/', async (req, res) => {
  const profiles = await Profile.find({});
  if (!profiles) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  res.status(200).json({ profiles });
});

profileRouter.post('/', adminMiddleware, async (req, res) => {
  const { name, description, linkedIn, twitter, github, interests } = req.body;
  const profileData = {
    name,
    description,
    linkedIn,
    twitter,
    github,
    interests,
  };
  const profileValidation = profileSchema.safeParse(profileData);
  if (!profileValidation.success) {
    let message = profileValidation.error.issues
      .map((issue) => issue.message)
      .join(' & ');
    return res.status(403).json({ message });
  }

  const profile = new Profile(profileData);
  const savedProfile = await profile.save();
  if (!savedProfile) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  res
    .status(201)
    .json({ profile: savedProfile, message: 'Profile saved successfully' });
});

profileRouter.get('/:id', adminMiddleware, async (req, res) => {
  const id = req.params.id;
  if (id == 'new') {
    return res.status(200).json({ profile: 'new' });
  }
  const profile = await Profile.findOne({ _id: id });
  if (!profile) {
    return res.status(404).json({ message: 'No such profile' });
  }
  res.status(200).json({ profile });
});

profileRouter.put('/:id', adminMiddleware, async (req, res) => {
  const { name, description, linkedIn, twitter, github, interests } = req.body;
  const profileData = {
    name,
    description,
    linkedIn,
    twitter,
    github,
    interests,
  };
  const profileValidation = profileSchema.safeParse(profileData);
  if (!profileValidation.success) {
    let message = profileValidation.error.issues
      .map((issue) => issue.message)
      .join(' & ');
    return res.status(403).json({ message });
  }
  const id = req.params.id;
  const profile = await Profile.findOneAndUpdate({ _id: id }, profileData);
  if (!profile) {
    return res.status(404).json({ message: 'No such profile' });
  }
  res.status(200).json({ profile, message: 'Profile updated successfully' });
});

profileRouter.delete('/:id', adminMiddleware, async (req, res) => {
  const id = req.params.id;
  const profile = await Profile.findOneAndDelete({ _id: id });
  if (!profile) {
    return res.status(404).json({ message: 'No such profile' });
  }
  res.status(200).json({ profile, message: 'Profile deleted successfully' });
});

module.exports = { profileRouter };
