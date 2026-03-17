// React hooks
import { useEffect, useState } from "react";

// Librería para hacer peticiones HTTP
import axios from "axios";
import "../styles/dashboard.css";
import { FaBox, FaWarehouse, FaArrowUp, FaArrowDown } from "react-icons/fa";

// Librerías necesarias para usar Chart.js en React
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

// Registramos los componentes del gráfico
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {

  // ===============================
  // ESTADOS
  // ===============================

  // Lista de productos
  const [products, setProducts] = useState([]);

  // Lista de movimientos de inventario
  const [movements, setMovements] = useState([]);

  // Token de autenticación guardado en el navegador
  const token = localStorage.getItem("token");


  // ===============================
  // CÁLCULOS DEL DASHBOARD
  // ===============================

  // Suma total del stock de todos los productos
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

  // Total de entradas de inventario
  const totalEntries = movements
    .filter((m) => m.type === "ENTRY")
    .reduce((acc, m) => acc + m.quantity, 0);

  // Total de salidas de inventario
  const totalExits = movements
    .filter((m) => m.type === "EXIT")
    .reduce((acc, m) => acc + m.quantity, 0);

  // Productos con bajo stock
  const lowStockProducts = products
    .filter((product) => product.stock <= 5)
    .sort((a, b) => a.stock - b.stock);


  // ===============================
  // DATOS DEL GRÁFICO
  // ===============================

  const chartData = {
    labels: ["Entries", "Exits"],
    datasets: [
      {
        data: [totalEntries, totalExits],
        backgroundColor: ["#4ade80", "#f87171"]
      }
    ]
  };


  // ===============================
  // PETICIÓN PARA OBTENER PRODUCTOS
  // ===============================

  const fetchProducts = async () => {
    try {

      const res = await axios.get(
        "http://localhost:3000/products",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProducts(res.data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  // ===============================
  // PETICIÓN PARA OBTENER MOVIMIENTOS
  // ===============================

  const fetchMovements = async () => {
    try {

      const res = await axios.get(
        "http://localhost:3000/movements",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMovements(res.data);

    } catch (error) {
      console.error("Error fetching movements:", error);
    }
  };


  // ===============================
  // useEffect
  // ===============================

  // Se ejecuta una sola vez al cargar el dashboard
  useEffect(() => {
    fetchProducts();
    fetchMovements();
  }, []);

  // ===============================
  // RENDER DEL DASHBOARD
  // ===============================

  return (

    <div 
      style={{ 
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >

      {/* Título del dashboard */}
      <h1 
        style={{ 
          fontSize: "28px", 
          marginBottom: "30px",
          color: "#111827" 
        }}
      >
        Dashboard
      </h1>


      {/* ===============================
          CARDS DE ESTADÍSTICAS
      =============================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
          marginBottom: "40px"
        }}
      >
        {/* Total productos */}
        <div className="dashboard-card">
          <div className="card-header" >
           <FaBox className="card-icon" />
            <h3>Total Products</h3>
          </div>
          <p>{products.length}</p>
        </div>

        {/* Total stock */}
        <div className="dashboard-card">
          <div className="card-header" >
           <FaWarehouse className="card-icon" />
            <h3>Total Stock</h3>
          </div>
          <p>{totalStock}</p>
        </div>

        {/* Total entradas */}
        <div className="dashboard-card">
          <div className="card-header" >
             <FaArrowUp className="card-icon" />
            <h3>Total Entries</h3>
          </div>
          <p>{totalEntries}</p>
        </div>

        {/* Total salidas */}
        <div className="dashboard-card">
          <div className="card-header" >
           <FaArrowDown className="card-icon" />
            <h3>Total Exits</h3>
          </div>
          <p>{totalExits}</p>
        </div>

      </div>


      {/* ===============================
          GRÁFICO DE INVENTARIO
      =============================== */}

      <div
        style={{
          marginBottom: "40px",
          maxWidth: "500px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
        }}
      >

        <h2>Inventory Movements</h2>

        <div
          style={{ width: "350px", margin: "0 auto" }}
        >
          <Pie data={chartData} />
        </div>
        

      </div>


      {/* ===============================
          MOVIMIENTOS RECIENTES
      =============================== */}

      <h2 style={{ marginTop: "40px" }}>
        Recent Movements
      </h2>

      <table
        style={{
            width: "100%",
            marginTop: "15px",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
          }}
      >

        <thead 
          style={{
            background: "#f3f4f6",
            textAlign: "left"
          }}
        >
          <tr>
            <th 
              style={{ 
                padding: "12px",
                background: "#f9fafb",
                textAlign: "left",
                fontSize: "14px"
              }} >ID</th>
            <th style={{ 
                padding: "12px",
                background: "#f9fafb",
                textAlign: "left",
                fontSize: "14px"
              }} >Product</th>
            <th style={{ 
                padding: "12px",
                background: "#f9fafb",
                textAlign: "left",
                fontSize: "14px"
              }} >Type</th>
            <th style={{ 
                padding: "12px",
                background: "#f9fafb",
                textAlign: "left",
                fontSize: "14px"
              }} >Quantity</th>
            <th style={{ 
                padding: "12px",
                background: "#f9fafb",
                textAlign: "left",
                fontSize: "14px"
              }} >Date</th>
          </tr>
        </thead>

        <tbody>

          {movements.slice(0,5).map((movement) => (

            <tr 
              key={movement.id}
              style={{
                borderTop: "1px solid #eee"
              }}
              >
              <td style={{ padding: "12px" }} >{movement.id}</td>
              <td style={{ padding: "12px" }} >{movement.product?.name}</td>
              <td>
                <span
                  style={{ 
                    padding: "5px 10px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: movement.type === "ENTRY" ? "#065f46" : "#7f1d1d",
                    background:
                      movement.type === "ENTRY"
                      ? "#d1fae5"
                      : "#fee2e2"

                  }}
                >
                  {movement.type}
                  </span>
                </td>
              <td style={{ padding: "12px" }} >{movement.quantity}</td>
              <td>
                {new Date(movement.createdAt).toLocaleString()}
              </td>
            </tr>

          ))}

        </tbody>

      </table>


      {/* ===============================
          PRODUCTOS CON BAJO STOCK
      =============================== */}

      <h2 style={{ marginTop: "40px" }}>
        ⚠ Low Stock Products
      </h2>

      {lowStockProducts.length === 0 ? (

        <p>All products have good stock</p>

      ) : (

        <table
          style={{
            width: "100%",
            marginTop: "15px",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
          }}
        >

          <thead
            style={{
            background: "#f3f4f6",
            textAlign: "left"
          }}
          >
            <tr>
              <th
                style={{ 
                padding: "12px",
                background: "#f9fafb",
                textAlign: "left",
                fontSize: "14px"
              }}
              >ID</th>
              <th
                style={{ 
                padding: "12px",
                background: "#f9fafb",
                textAlign: "left",
                fontSize: "14px"
              }}
              >Product</th>
              <th
                style={{ 
                padding: "12px",
                background: "#f9fafb",
                textAlign: "left",
                fontSize: "14px"
              }}
              >Stock</th>
            </tr>
          </thead>

          <tbody>

            {lowStockProducts.map((product) => (

              <tr
                style={{
                  borderTop: "1px solid #eee"
                }} key={product.id}>
                <td style={{ padding: "12px" }} >{product.id}</td>
                <td style={{ padding: "12px" }} >{product.name}</td>
                <td style={{ color: "#b91c1c", fontWeight: "bold" }}>
                  {product.stock}
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );
}

export default Dashboard;