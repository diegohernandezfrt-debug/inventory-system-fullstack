import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProductMovements() {

  const { id } = useParams();

  const [movements, setMovements] = useState([]);

  const navigate = useNavigate();

  const fetchMovements = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await api.get(`/products/${id}/movements`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMovements(res.data);

    } catch (error) {

      console.log(error.response?.data);
      console.log(error);

    }

  };

  useEffect(() => {

    fetchMovements();

  }, []);

  return (

    <div style={{ padding:"30px" }}>

      <h1>Product Movements</h1>

      <button 
        className="primary-button"
        onClick={() => navigate(`/products/${id}/add-movement`)}>
      Add Movement
      </button>

      <table className="products-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {movements.map((movement) => (

            <tr key={movement.id}>

              <td>{movement.id}</td>
              <td>
                <span
                  style={{
                    color: movement.type === "ENTRY" ? "green" : "red",
                    fontWeight: "bold"
                  }}
                >
                  {movement.type === "ENTRY" ? "⬆ ENTRY" : "⬇ EXIT"}
                </span>
              </td>
              <td>{movement.quantity}</td>
              <td>{movement.createdAt}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ProductMovements;