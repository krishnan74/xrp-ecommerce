"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard"; // Import the ProductCard component
import { createClient } from "@supabase/supabase-js";
import { useSelectedWallet } from "../SelectedWalletContext";
import { Button } from "components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const supabase = createClient(
  "https://fveklwaemqucyxsrbmhv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTMyNTc2MSwiZXhwIjoyMDA2OTAxNzYxfQ.xukOaFj-7g5OP2DEiBgK5BFg_BxvUgV2YVoxGDUc70I"
);

const ProductUpload = () => {
  const { selectedWallet } = useSelectedWallet();
  var selectWallet = null;
  const [products, setProducts] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");

  const handleSelectChange = (e, setSelectedOption) => {
    setSelectedOption(e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const tags = [
    "Electronics",
    "Smartphone",
    "Apple",
    "Gaming",
    "Console",
    "Entertainment",
    "Sports",
    "Footwear",
    "Style",
    "Laptop",
    "Performance",
    "Music",
    "Collectibles",
    "Vintage",
    "Camera",
    "Outdoors",
    "Smart-Home",
    "Voice-Control",
    "TV",
    "Photography",
    "Headphones",
    "Bose",
    "Design",
    "Instrument",
    "Guitar",
    "Nintendo",
    "Accessory",
    "Tablet",
    "Productivity",
    "Wearable",
    "Streaming",
  ];

  useEffect(() => {
    console.log(selectedWallet ? selectedWallet : "No wallet selected ");
    setFormData({ ...formData, sellerAddress: selectedWallet ? selectedWallet.classicAddress : "" });
  }, [selectedWallet]);

  const fetchProductData = async () => {
    let { data, error } = await supabase
      .from("ProductTable")
      .select()
      .eq("sellerAddress", selectedWallet ? selectedWallet.classicAddress : "");
    return { data, error };
  };

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const { data, error } = await fetchProductData();
      if (data) {
        setProducts(data);
      }
    };

    fetchDataAndSetData();
  }, [products]);
  // State to store uploaded products
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    tag1: "",
    tag2: "",
    tag3: "",
    sellerAddress: "",
    sellerName: "",
  });

  
  

  const handleUpload = async () => {
    const newProduct = { ...formData };

    try {
      const { data, error } = await supabase
        .from("ProductTable")
        .insert([newProduct]);

      if (error) {
        console.error("Error inserting product:", error);
      } else {
        console.log("Product inserted successfully:", data);

        setFormData({
          name: "",
          description: "",
          cost: "",
          tag1: "",
          tag2: "",
          tag3: "",
        });
      }
    } catch (error) {
      console.error("Error inserting product:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Uploaded Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((item) => (
            <ProductCard
              mode="sell"
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
      <div className="bg-white rounded-md p-6 shadow-md mt-8">
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
            type="hidden"
            name="sellerAddress"
            placeholder=""
            value={formData.sellerAddress}
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
          <select
            value={selectedOption1}
            onChange={(e) => handleSelectChange(e, setSelectedOption1)}
            name="tag1"
          >
            <option value="">Select an option</option>
            {tags.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={selectedOption2}
            onChange={(e) => handleSelectChange(e, setSelectedOption2)}
            name="tag2"
          >
            <option value="">Select an option</option>
            {tags.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={selectedOption3}
            onChange={(e) => handleSelectChange(e, setSelectedOption3)}
            name="tag3"
          >
            <option value="">Select an option</option>
            {tags.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>


        </div>

        <Button onClick={handleUpload} className="mt-4">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Upload Product
        </Button>
      </div>
    </div>
  );
};

export default ProductUpload;
