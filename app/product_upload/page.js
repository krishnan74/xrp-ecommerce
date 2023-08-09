"use client";

import Image from "next/image";
import ProductUpload from "./ProductUpload";

import Navbar from "components/Navbar";




const xrpl = require("xrpl");

const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");




export default function Page() {


  return (
    <div className="page-container">
      <div className="">
        <Navbar />
      </div>
    <div className="h-24"></div>
      <div className="">
        <ProductUpload></ProductUpload>
      </div>
    </div>
  );
}
