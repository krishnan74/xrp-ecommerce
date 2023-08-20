'use client'

import Image from "next/image";

import NavbarLayout from "components/NavbarLayout";
import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard";

import MessagePageComponent from "./MessagePageComponent";
import { usePathname, useSearchParams } from 'next/navigation'


export default function MessagePage() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sellerAddress = searchParams.get('sellerAddress')
  const sellerName = searchParams.get('sellerName')
  const messageMode = searchParams.get('messageMode')
  //const sellerAddress = router.query.sellerAddress;

  // if (!sellerAddress) {
  //   // Query parameter not available yet, return a loading state or handle the case
  //   return <div>Loading...</div>;
  // }
  // MessagePage.getInitialProps = async () => {
  //   return {};
  // };
  return (
    <div className="page-container">
      <div className="">
        <Navbar />
      </div>
    <div className="h-24"></div>
      <div className="">
        <MessagePageComponent sellerAddress={sellerAddress} sellerName={sellerName} mode={ messageMode } />
      </div>
    </div>
  );
}
