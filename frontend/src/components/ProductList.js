import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  };

  return (
    <div className="product-list">
      <h2>Product list</h2>
      <ul>
        <li>S. no.</li>
        <li>name</li>
        <li>price</li>
        <li>category</li>
        <li>operation</li>
      </ul>
      {products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>
            <button onClick={() => handleDelete(item._id)}>delete</button>
          </li>
        </ul>
      ))}
    </div>
  );
};
export default ProductList;
