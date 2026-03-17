import { useState, useEffect } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await api.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const product = res.data;

        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setStock(product.stock);

      } catch (error) {

        console.log(error.response?.data);
        console.log(error);

      }

    };

    fetchProduct();

  }, [id]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await api.put(`/products/${id}`, {

        name,
        description,
        price: Number(price),
        stock: Number(stock)

      }, {

        headers: {
          Authorization: `Bearer ${token}`
        }

      });

      alert("Product updated");

      navigate("/products");

    } catch (error) {

      console.log(error.response?.data);
      console.log(error);

      alert("Error updating product");

    }

  };

  return(

    <div style={{padding:"30px"}}>

    <h1 style={{marginBottom:"20px"}}>

    Edit Product

    </h1>

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

    Update Product

    </button>

    </form>

    </div>

    </div>

    );

}

export default EditProduct;