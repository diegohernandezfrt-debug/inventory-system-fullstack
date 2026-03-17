import { useState } from "react";
import api from "../api/api";

function AddProduct() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/products",
        {
          name,
          description,
          price: Number(price),
          stock: Number(stock)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product created");

      setName("");
      setDescription("");
      setPrice("");
      setStock("");

    } catch (error) {

      console.log(error.response?.data);
      console.log(error);

      alert("Error creating product");

    }

  };

  return (

    <div style={{padding:"30px"}}>

    <h1 style={{marginBottom:"20px"}}>Add Product</h1>

    <div className="form-container">

    <form onSubmit={handleSubmit}>

    <input
    className="form-input"
    placeholder="Name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    />

    <input
    className="form-input"
    placeholder="Description"
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
    />

    <input
    className="form-input"
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e)=>setPrice(e.target.value)}
    />

    <input
    className="form-input"
    type="number"
    placeholder="Stock"
    value={stock}
    onChange={(e)=>setStock(e.target.value)}
    />

    <button className="form-button">
    Create Product
    </button>

    </form>

    </div>

    </div>

    );

}

export default AddProduct;