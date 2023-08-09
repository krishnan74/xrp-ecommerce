"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "components/ui/button";
import { buttonVariants } from "components/ui/button";
import { UserButton } from "@clerk/nextjs";
import NavbarLayout from "components/NavbarLayout";
import Navbar from "components/Navbar";

import Dashboard from "./Dashboard";
import ProductCard from "components/ProductCard";

const xrpl = require("xrpl");

const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");




export default function DashBoardPage() {


  return (
    <div className="page-container">
      <div className="">
        <Navbar />
      </div>
    <div className="h-24"></div>
      <div className="">
        <Dashboard></Dashboard>
      </div>
    </div>
  );
}
