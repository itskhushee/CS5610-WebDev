// api/controllers/itemController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllItems = async (req, res) => {
  try {
    const items = await prisma.transaction.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { amount, note } = req.body;
    if (amount === undefined) {
      return res.status(400).json({ error: 'Amount is required' });
    }
    const newItem = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        note: note || '',
        userId: req.userId
      }
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
