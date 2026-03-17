const prisma = require("../config/prisma");

const createMovement = async (req, res) => {
  try {

    const { productId, type } = req.body;
    const quantity = Number(req.body.quantity);
    const userId = req.user.userId;

    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    let newStock = product.stock;

    if (type === "ENTRY") {
      newStock += quantity;
    }

    if (type === "EXIT") {
      if (product.stock < quantity) {
        return res.status(400).json({ message: "Stock insuficiente" });
      }

      newStock -= quantity;
    }

  const movement = await prisma.inventoryMovement.create({
  data: {
    type,
    quantity,
    product: {
      connect: { id: productId }
    },
    user: {
      connect: { id: userId } // req.user.id
    }
  }
});

    await prisma.product.update({
      where: { id: productId },
      data: { stock: newStock }
    });

    res.status(201).json(movement);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovements = async (req, res) => {
  try {

    const movements = await prisma.inventoryMovement.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true
          }
        },
        user: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(movements);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMovement,
  getMovements
};