"use client";
import React, { useState } from "react";
import ProductCard from "../../components/ProductCard"; // Import the ProductCard component
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://fveklwaemqucyxsrbmhv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTMyNTc2MSwiZXhwIjoyMDA2OTAxNzYxfQ.xukOaFj-7g5OP2DEiBgK5BFg_BxvUgV2YVoxGDUc70I"
);
  
const ProductUploadPage = () => {
  const [products, setProducts] = useState([]); // State to store uploaded products
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    tag1: "",
    tag2: "",
    tag3: "",
    sellerAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpload = async () => {
    const newProduct = { ...formData};
  
    try {
      const { data, error } = await supabase
        .from('ProductTable')
        .insert([newProduct]);
  
      if (error) {
        console.error('Error inserting product:', error);
      } else {
        console.log('Product inserted successfully:', data);
        setProducts([...products, newProduct]);
        setFormData({
          name: '',
          description: '',
          cost: '',
          tag1: '',
          tag2: '',
          tag3: '',
          sellerAddress: '',
        });
      }
    } catch (error) {
      console.error('Error inserting product:', error);
    }
  };
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Product Upload Page</h1>
      <div className="bg-white rounded-md p-6 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Upload a New Product</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="number"
            name="cost"
            placeholder="Cost"
            value={formData.cost}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="text"
            name="tag1"
            placeholder="Tag 1"
            value={formData.tag1}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="text"
            name="tag2"
            placeholder="Tag 2"
            value={formData.tag2}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="text"
            name="tag3"
            placeholder="Tag 3"
            value={formData.tag3}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="text"
            name="sellerAddress"
            placeholder="Seller Address"
            value={formData.sellerAddress}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <button
          onClick={handleUpload}
          className="btn bg-blue-500 text-white mt-4 hover:bg-blue-600 transition duration-300"
        >
          Upload Product
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Uploaded Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              name={item.name}
              description={item.description}
              cost={item.cost}
              tag1={item.tag1}
              tag2={item.tag2}
              tag3={item.tag3}
              sellerAddress={item.sellerAddress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductUploadPage;