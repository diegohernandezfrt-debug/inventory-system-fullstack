const express = require('express');
const router = express.Router();
const checkRole = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const { 
    createProduct, getProducts, updateProduct, deleteProduct, 
    getProductById, getProductStock, getProductMovements
} = require('../controllers/product.controller');

router.post('/', authMiddleware, checkRole(['admin']), createProduct);
router.put('/:id', authMiddleware, checkRole(['admin']), updateProduct);
router.delete('/:id', authMiddleware, checkRole(['admin']), deleteProduct);

router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProductById);
router.get('/:id/stock', authMiddleware, getProductStock);
router.get('/:id/movements', authMiddleware, getProductMovements);

module.exports = router;