import React from 'react';
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://fveklwaemqucyxsrbmhv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzMjU3NjEsImV4cCI6MjAwNjkwMTc2MX0.xxunT1-FVfyByRp_KIwvknVcvw1Yt9balVDb1z-463o"
);
import ProductCard from "components/ProductCard";

const fetchData = async () => {
  let { data, error } = await supabase
    .from("UserTable")
    .select("name");

  console.log(data);
  return { data, error };
};

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const { data, error } = await fetchData();
      if (data) {
        setData(data);
      }
    };

    fetchDataAndSetData();
  }, []);

  return (
    <>
      <div className="custom-scrollbar overflow-x-auto whitespace-nowrap">
        <div className="flex gap-10 px-10">
          <ProductCard
            name={data.name}
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
        </div>
      </div>

      <div className="h-24"></div>
      <div className="custom-scrollbar overflow-x-auto whitespace-nowrap">
        <div className="flex gap-10 px-10">
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
        </div>
      </div>

      <div className="h-24"></div>
      <div className="custom-scrollbar overflow-x-auto whitespace-nowrap">
        <div className="flex gap-10 px-10">
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
          <ProductCard
            name="Honda Bike"
            description="250CC 60ml 45cq torque"
            cost="30"
            tag="Bike"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
