import React from 'react';
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://fveklwaemqucyxsrbmhv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTMyNTc2MSwiZXhwIjoyMDA2OTAxNzYxfQ.xukOaFj-7g5OP2DEiBgK5BFg_BxvUgV2YVoxGDUc70I"
);
import ProductCard from "components/ProductCard";

const fetchProductData = async () => {
  let { data, error } = await supabase.from("ProductTable").select();
  return { data, error };
};

const insertData = async () => {
  const { error } = await supabase
    .from("UserTable")
    .insert({ name: "Denmark" });
};

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const { data, error } = await fetchProductData();
      if (data) {
        setData(data);
      }
    };

    fetchDataAndSetData();
  }, [data]);

  return (
    <>
      <button onClick={insertData}>InsertData</button>

      <div className="custom-scrollbar overflow-x-auto whitespace-nowrap">
        <div className="flex gap-10 px-10">
        {data.map((item) => (
            <ProductCard
              key={item.id} // Make sure to use a unique key for each iteration
              name={item.name}
              description={item.description}
              cost={item.cost}
              tag1={item.tag1}
              tag2={item.tag2}
              tag3={item.tag3}
              sellerAddress = {item.sellerAddress}
            />
          ))}
          
          
        </div>
      </div>

      
    </>
  );
};

export default Dashboard;
