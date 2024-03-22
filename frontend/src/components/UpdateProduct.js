import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);
  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setBrand(result.company);
  };

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, brand }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    // console.log(result);
    navigate("/");
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
      <button className="addButton" onClick={updateProduct}>
        Update
      </button>
    </div>
  );
};
export default UpdateProduct;
