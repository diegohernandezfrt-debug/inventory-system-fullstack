const prisma = require('../config/prisma');

const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        userId: req.user.userId
      }
    });

    res.status(201).json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: req.user.userId
      }
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: req.body
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

const getProductById = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductStock = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        stock: true
      }
    });

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductMovements = async (req, res) => {
  try {

    const { id } = req.params;

    const movements = await prisma.inventoryMovement.findMany({
      where: {
        productId: Number(id)
      },
      include: {
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

    res.status(500).json({
      error: error.message
    });

  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStock,
  getProductMovements
};