"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "components/ui/button";
import { buttonVariants } from "components/ui/button";
import { UserButton } from "@clerk/nextjs";
import NavbarLayout from "components/NavbarLayout";
import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard";
import MessagePageComponent from "./MessagePageComponent";
import { useRouter } from "next/router";

export default function MessagePage() {
  const router = useRouter();
  const { sellerAddress } = router.query;

  return (
    <div className="page-container">
      <div className="">
        <Navbar />
      </div>
    <div className="h-24"></div>
      <div className="">
        <MessagePageComponent></MessagePageComponent>
      </div>
    </div>
  );
}
