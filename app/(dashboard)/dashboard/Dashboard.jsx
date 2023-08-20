import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSelectedWallet } from "../../SelectedWalletContext";
import ProductCard from "components/ProductCard";
import { X } from "lucide-react";

const supabase = createClient(
  "https://fveklwaemqucyxsrbmhv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTMyNTc2MSwiZXhwIjoyMDA2OTAxNzYxfQ.xukOaFj-7g5OP2DEiBgK5BFg_BxvUgV2YVoxGDUc70I"
);



const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const fetchProductData = async () => {
    let { data, error } = await supabase.from("ProductTable").select();
  
    if (selectedTag) {
      data = data.filter(
        (item) =>
          item.tag1?.toLowerCase().includes(selectedTag.toLowerCase()) ||
          item.tag2?.toLowerCase().includes(selectedTag.toLowerCase()) ||
          item.tag3?.toLowerCase().includes(selectedTag.toLowerCase())
      );
    }
  
    return { data, error };
  };
  
  

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const { data, error } = await fetchProductData();
      if (data) {
        setData(data);
      }
    };

    fetchDataAndSetData();
  }, [selectedTag]);

  const { selectedWallet } = useSelectedWallet();

  useEffect(() => {
    console.log(selectedWallet ? selectedWallet : "No wallet selected");
  }, [selectedWallet]);

  useEffect(() => {

  }, [selectedTag])

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    // You can use the selected tag to filter the products
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
  

  
  

  return (<div className="bg-white text-black min-h-screen py-10">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex justify-start custom-scrollbar2 gap-4 overflow-auto">
      {tags.map((tag) => (
        <div key={tag} className="flex relative">
          <button
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 rounded-md border ${
              selectedTag === tag
                ? "bg-black text-white border-black rounded-l-md"
                : "bg-white text-black border-black"
            } hover:bg-black hover:text-white hover:border-black transition whitespace-nowrap`}
          >
            {tag}
          </button>
          {selectedTag === tag && (
            <button
              onClick={() => handleTagClick(null)}
              className="px-2 rounded-r-md bg-black text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>
      ))}
    </div>

    <section className="mb-8 mt-8">
      <h1 className="text-3xl font-semibold mb-4">Trending Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <ProductCard
            key={item.id}
            mode="buy"
            name={item.name}
            description={item.description}
            cost={item.cost}
            tag1={item.tag1}
            tag2={item.tag2}
            tag3={item.tag3}
            sellerAddress={item.sellerAddress}
            sellerName={item.sellerName}
          />
        ))}
      </div>
    </section>

    <section className="mb-8">
      {/* Add another section here */}
      <h1 className="text-3xl font-semibold mb-4">New Arrivals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Display new arrival products */}
      </div>
    </section>

    {/* Add more sections as needed */}
  </div>
</div>
  );
};

export default Dashboard;
