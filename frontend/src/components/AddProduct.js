import React from "react";
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = async () => {
    if (!name || !price || !category || !brand) {
      //   setError(true);
      alert("please enter valid details");
      return false;
    }

    console.log(name, price, category, brand);
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add", {
      method: "POST",
      body: JSON.stringify({ name, price, category, brand, userID }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
  };

  return (
    <div className="addProduct">
      <h1 className="addTitle">Add Product</h1>
      <input
        className="input-field form-group"
        value={name}
        placeholder="Enter product name"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {/* {error && !name && (
        <span className="errorMessage">enter a valid name</span>
      )} */}

      <input
        className="input-field form-group"
        value={price}
        placeholder="Enter product price"
        type="text"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {/* {error && !price && (
        <span className="errorMessage">enter a valid price</span>
      )} */}
      <input
        className="input-field form-group"
        value={category}
        placeholder="Enter product category"
        type="text"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {/* {error && !category && (
        <span className="errorMessage">enter a valid category</span>
      )} */}
      <input
        className="input-field form-group"
        value={brand}
        placeholder="Enter product brand"
        type="text"
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      />
      {/* {error && !brand && (
        <span className="errorMessage">enter a valid brand</span>
      )} */}
      <button className="addButton" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};
export default AddProduct;
