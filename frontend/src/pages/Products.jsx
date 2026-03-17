import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Products() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = products
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((product) => {
    if (stockFilter === "low") return product.stock <= 5;
    if (stockFilter === "normal") return product.stock > 5;
    return true;
  });
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = indexOfFirstProduct + 1;

  const endIndex = Math.min(indexOfLastProduct, filteredProducts.length);

  const fetchProducts = async () => {

    setLoading(true);

    try {

      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts(res.data);

      setLoading(false);

    } catch (error) {

      console.log(error.response?.data);
      console.log(error);
      alert("Error creating product");
      }

  };

  const deleteProduct = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/products/${productToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setShowDeleteModal(false);
      setProductToDelete(null);

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Error deleting product");

    }

  };

const exportCSV = () => {

    const headers = ["ID", "Name", "Price", "Stock"];

    const rows = products.map(product => [
      product.id,
      product.name,
      product.price,
      product.stock
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };


  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <div style={{padding:"30px"}}>

    <div className="products-header">

    <h1>Products</h1>

    <div className="products-actions">

    <button
    className="primary-button"
    onClick={() => navigate("/add-product")}
    >
    Add Product
    </button>

    <button
    className="secondary-button"
    onClick={exportCSV}
    >
    Export CSV
    </button>

    </div>

    </div>


    <div className="search-bar">

    <input
    className="search-input"
    type="text"
    placeholder="Search product..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    />

    <select
    className="filter-select"
    value={stockFilter}
    onChange={(e)=>setStockFilter(e.target.value)}
    >

    <option value="all">All Stock</option>
    <option value="low">Low Stock</option>
    <option value="normal">Normal Stock</option>

    </select>

    </div>

    {loading ? (

<div className="skeleton-container">

{[...Array(5)].map((_,i)=>(
<div key={i} className="skeleton-row"></div>
))}

</div>

) : (

    <table className="products-table">

    <thead>

    <tr>
    <th>#</th>
    <th>ID</th>
    <th>Name</th>
    <th>Price</th>
    <th>Stock</th>
    <th>Actions</th>
    </tr>

    </thead>

    <tbody>

    {currentProducts.map((product, index)=>(
    <tr key={product.id}>

    <td>{index + 1}</td>

    <td>{product.id}</td>

    <td>{product.name}</td>

    <td>${product.price}</td>

    <td>

    <span
    style={{
    color: product.stock <= 5 ? "#b91c1c" : "#065f46",
    fontWeight:"bold"
    }}
    >

    {product.stock} {product.stock <= 5 && "(Low)"}

    </span>

    </td>

    <td>

    <div className="actions-buttons">

    <button
    className="action-button movements-button"
    onClick={()=>navigate(`/products/${product.id}/movements`)}
    >
    Movements
    </button>

    <button
    className="action-button edit-button"
    onClick={()=>navigate(`/edit-product/${product.id}`)}
    >
    Edit
    </button>

    <button
    className="action-button delete-button"
    onClick={()=>{
    setProductToDelete(product.id);
    setShowDeleteModal(true);
    }}
    >
    Delete
    </button>

    </div>

    </td>

    </tr>
    ))}

    </tbody>

    </table>
  )}

  <p className="pagination-info">

    Showing {filteredProducts.length === 0 ? 0 : startIndex}
    –
    {endIndex}
    of {filteredProducts.length} products

    </p>

  <div className="pagination">

    <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    >
    Prev
    </button>

    <span>

    Page {currentPage} of {totalPages}

    </span>

    <button
    onClick={() =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
    disabled={currentPage === totalPages}
    >
    Next
    </button>

    </div>

{showDeleteModal && (

<div className="modal-overlay">

<div className="modal">

<h3>Delete Product</h3>

<p>Are you sure you want to delete this product?</p>

<div className="modal-actions">

<button
className="secondary-button"
onClick={()=>setShowDeleteModal(false)}
>
Cancel
</button>

<button
className="delete-button"
onClick={deleteProduct}
>
Delete
</button>

</div>

</div>

</div>

)}


    </div>

);
}

export default Products;