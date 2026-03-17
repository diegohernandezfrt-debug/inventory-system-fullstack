const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEntry = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const movement = await prisma.inventoryMovement.create({
      data: {
        type: "ENTRY",
        quantity,
        productId,
        userId
      }
    });

    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          increment: quantity
        }
      }
    });

    res.json(movement);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createExit = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product || product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    const movement = await prisma.inventoryMovement.create({
      data: {
        type: "EXIT",
        quantity,
        productId,
        userId
      }
    });

    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity
        }
      }
    });

    res.json(movement);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const { productId } = req.params;

    const history = await prisma.inventoryMovement.findMany({
      where: {
        productId: Number(productId)
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(history);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEntry,
  createExit,
  getHistory
};