import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSelectedWallet } from "../../SelectedWalletContext";
import ProductCard from "components/ProductCard";
import { X } from "lucide-react";

const supabase = createClient(
  "https://fveklwaemqucyxsrbmhv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTMyNTc2MSwiZXhwIjoyMDA2OTAxNzYxfQ.xukOaFj-7g5OP2DEiBgK5BFg_BxvUgV2YVoxGDUc70I"
);

const fetchProductData = async () => {
  let { data, error } = await supabase.from("ProductTable").select();
  return { data, error };
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const { data, error } = await fetchProductData();
      if (data) {
        setData(data);
      }
    };

    fetchDataAndSetData();
  }, []);

  const { selectedWallet } = useSelectedWallet();

  useEffect(() => {
    console.log(selectedWallet ? selectedWallet : "No wallet selected oombu");
  }, [selectedWallet]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    // You can use the selected tag to filter the products
  };

  const tags = [
    "Pets",
    "Kites",
    "Sports",
    "Food",
    "Watches",
    "Smart Phones",
    "Vehicles",
    "Electronics",
    "Clothing",
    "Home",
    "Books",
    "Beauty",
    "Toys",
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10"
      style={{
        backgroundImage: `url('bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-start custom-scrollbar2 gap-4 overflow-auto">
          {tags.map((tag) => (
            <div key={tag} className="flex relative">
              <button
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 rounded-md border ${
                  selectedTag === tag
                    ? "bg-blue-500 text-white border-blue-500 rounded-l-md"
                    : "bg-white text-gray-600 border-gray-300"
                } hover:bg-blue-500 hover:text-white hover:border-blue-500 transition whitespace-nowrap`}
              >
                {tag}
              </button>
              {selectedTag === tag && (
                <button
                  onClick={() => handleTagClick(null)}
                  className="px-2 rounded-r-md bg-white text-blue-500"
                >
                  <X size = {20}></X>
                </button>
              )}
            </div>
          ))}
        </div>

        <section className="mb-8 mt-8">
          <h1 className="text-3xl font-semibold mb-4 text-white">Trending Products</h1>
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
          <h1 className="text-3xl font-semibold mb-4 text-white">New Arrivals</h1>
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
