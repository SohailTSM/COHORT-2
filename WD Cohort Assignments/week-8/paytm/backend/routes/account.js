const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  if (!account) {
    return res.status(500).json({ message: 'Error' });
  }
  res.status(200).json({
    balance: account.balance,
  });
});

router.post('/transfer', authMiddleware, async (req, res) => {
  const fromAccount = await Account.findOne({ userId: req.userId });
  if (!fromAccount) {
    return res.status(500).json({ message: 'Error' });
  }
  if (fromAccount.balance < req.body.amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }
  try {
    const toAccount = await Account.findOne({ userId: req.body.to });
    if (!toAccount) {
      return res.status(400).json({ message: 'Invalid account 1' });
    }

    fromAccount.balance -= parseInt(req.body.amount);
    toAccount.balance += parseInt(req.body.amount);

    await fromAccount.save();
    await toAccount.save();

    return res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid account 2' });
    return;
  }
});

module.exports = router;
