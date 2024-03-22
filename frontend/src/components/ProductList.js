import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const handleSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
    // let result = await fetch(`http://localhost:5000/search/${key}`, {
    //   headers: {
    //     authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    //   },
    // });
    // result = await result.json();
    // if (result) {
    //   setProducts(result);
    // }
  };

  return (
    <div className="product-list">
      <h2>Product list</h2>
      <input
        className="searchBar"
        type="text"
        placeholder="search product"
        onChange={handleSearch}
      />
      <ul>
        <li>S. no.</li>
        <li>name</li>
        <li>price</li>
        <li>category</li>
        <li>operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => handleDelete(item._id)}>delete</button>
              <button onClick={() => handleUpdate(item._id)}>update</button>
            </li>
          </ul>
        ))
      ) : (
        <h1>no products found</h1>
      )}
    </div>
  );
};
export default ProductList;
