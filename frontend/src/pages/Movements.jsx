import { useEffect, useState } from "react";
import api from "../api/api";

function Movements() {

  const [movements, setMovements] = useState([]);

  const fetchMovements = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await api.get("/movements", {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      setMovements(res.data);

    } catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    fetchMovements();

  },[]);

  return(

  <div style={{padding:"30px"}}>

    <h1 style={{marginBottom:"20px"}}>
      All Movements
    </h1>

    <table className="products-table">

      <thead>

        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Date</th>
        </tr>

      </thead>

      <tbody>

      {movements.map((movement)=>(

        <tr key={movement.id}>

          <td>{movement.id}</td>

          <td>{movement.product?.name}</td>

          <td>

            <span
            style={{
              color: movement.type === "ENTRY" ? "#065f46" : "#b91c1c",
              fontWeight:"bold"
            }}
            >

              {movement.type === "ENTRY" ? "⬆ ENTRY" : "⬇ EXIT"}

            </span>

          </td>

          <td>{movement.quantity}</td>

          <td>

          {new Date(movement.createdAt).toLocaleString()}

          </td>

        </tr>

      ))}

      </tbody>

    </table>

  </div>

  );

}

export default Movements;