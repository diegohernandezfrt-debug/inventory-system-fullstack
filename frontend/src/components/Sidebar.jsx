import { Link, useNavigate } from "react-router-dom";


function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (

    <div
      style={{
        width: "220px",
        height: "auto",
        background: "#1f2937",
        color: "white",
        top: 0,
        bottom: 0,
        padding: "20px"
      }}
    >


      <h2
        style={{
          marginBottom: "30px",
          fontSize: "20px",
          fontWeight: "bold"
        }}
      >
        Inventory
        System</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        <Link to="/dashboard" 
          style={{ 
            color: "white", 
            textDecoration: "none",
            padding: "10px",
            borderRadius: "6px"
          }}
          onMouseEnter={(e) => e.target.style.background = "#374151"}
          onMouseLeave={(e) => e.target.style.background = "transparent"}
        >
          🏠 Dashboard
        </Link>

        <Link to="/products" 
          style={{ 
            color: "white", 
            textDecoration: "none",
            padding: "10px",
            borderRadius: "6px"
          }}
          onMouseEnter={(e) => e.target.style.background = "#374151"}
          onMouseLeave={(e) => e.target.style.background = "transparent"}
        >
          📦 Products
        </Link>

        <Link to="/movements" 
          style={{ 
            color: "white", 
            textDecoration: "none",
            padding: "10px",
            borderRadius: "6px"
          }}
          onMouseEnter={(e) => e.target.style.background = "#374151"}
          onMouseLeave={(e) => e.target.style.background = "transparent"}
        >
          🔄 Movements
        </Link>

        <button
          onClick={logout}
          className="logout-button"
        >
          Logout
        </button>

      </nav>

    </div>

  );

}

export default Sidebar;
