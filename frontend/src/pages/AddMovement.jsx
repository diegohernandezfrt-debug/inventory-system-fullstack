import { useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

function AddMovement() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [type, setType] = useState("ENTRY");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await api.post("/movements", {

        productId: Number(id),
        type,
        quantity: Number(quantity)

      }, {

        headers: {
          Authorization: `Bearer ${token}`
        }

      });

      alert("Movement created");

      navigate(`/products/${id}/movements`);

    } catch (error) {

      console.log(error.response?.data);
      console.log(error);

      alert("Error creating movement");

    }

  };

  return(

    <div style={{padding:"30px"}}>

    <h1 style={{marginBottom:"20px"}}>

    Add Movement

    </h1>

    <div className="form-container">

    <form onSubmit={handleSubmit}>

    <label>Type</label>

    <select
    className="form-input"
    value={type}
    onChange={(e)=>setType(e.target.value)}
    >

    <option value="ENTRY">Entry</option>
    <option value="EXIT">Exit</option>

    </select>

    <input
    className="form-input"
    type="number"
    placeholder="Quantity"
    value={quantity}
    onChange={(e)=>setQuantity(e.target.value)}
    />

    <button className="form-button">

    Create Movement

    </button>

    </form>

    </div>

    </div>

    );

}

export default AddMovement;