const prisma = require('../config/prisma');

const getDashboard = async (req, res) => {
  try {

    const totalProducts = await prisma.product.count();

    const totalMovements = await prisma.inventoryMovement.count();

    const stockData = await prisma.product.aggregate({
      _sum: {
        stock: true
      }
    });

    const totalStock = stockData._sum.stock || 0;

    res.json({
      totalProducts,
      totalStock,
      totalMovements
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = {
  getDashboard
};