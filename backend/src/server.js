const express = require('express');
const cors = require('cors');
require('dotenv').config();

const prisma = require('./config/prisma');
const app = express();

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const inventoryRoutes = require('./routes/inventory.routes');
const movementRoutes = require('./routes/movement.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/movements',movementRoutes);
app.use('/dashboard', dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
  try {
    const users = await prisma.user.findMany();
    res.json({ message: "Backend funcionando", users });
  } catch (error) {
    res.status(500).json({ error: "Error de conexión" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
