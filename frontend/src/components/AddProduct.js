import React from "react";
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const handleAdd = () => {
    console.log(name, price, category, brand);
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
      <input
        className="input-field form-group"
        value={price}
        placeholder="Enter product price"
        type="text"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <input
        className="input-field form-group"
        value={category}
        placeholder="Enter product category"
        type="text"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <input
        className="input-field form-group"
        value={brand}
        placeholder="Enter product brand"
        type="text"
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      />
      <button className="addButton" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};
export default AddProduct;
