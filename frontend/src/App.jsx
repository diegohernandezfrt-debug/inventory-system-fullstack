import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductMovements from "./pages/ProductMovements";
import AddMovement from "./pages/AddMovement";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import Movements from "./pages/Movements";

function Layout() {

  const location = useLocation();

  const hideLayout = location.pathname === "/";

  return (
    <>
      
      <div style={{ display: "flex" }}>

        {!hideLayout && <Sidebar />}

        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "#f3f4f6",
            minHeight: "100vh"
          }}
        >
          <div
            style={{
              marginLeft: hideLayout ? "0" : "220px",
              padding: "20px",
              marginTop: hideLayout ? "0" : "80px"
            }}
          >

            <Routes>

              <Route path="/" element={<Login />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/products"
                element={
                  <PrivateRoute>
                    <Products />
                  </PrivateRoute>
                }
              />

              <Route
                path="/add-product"
                element={
                  <PrivateRoute>
                    <AddProduct />
                  </PrivateRoute>
                }
              />

              <Route
                path="/edit-product/:id"
                element={
                  <PrivateRoute>
                    <EditProduct />
                  </PrivateRoute>
                }
              />

              <Route
                path="/products/:id/movements"
                element={
                  <PrivateRoute>
                    <ProductMovements />
                  </PrivateRoute>
                }
              />

              <Route
                path="/products/:id/add-movement"
                element={
                  <PrivateRoute>
                    <AddMovement />
                  </PrivateRoute>
                }
              />

              <Route
                path="/movements"
                element={
                  <PrivateRoute>
                    <Movements />
                  </PrivateRoute>
                }
              />

            </Routes>
          </div>
        </div>

      </div>

      
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;