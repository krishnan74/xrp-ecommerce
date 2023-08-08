"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "components/ui/button";
import { buttonVariants } from "components/ui/button";
import { UserButton } from "@clerk/nextjs";
import NavbarLayout from "components/NavbarLayout";
import Navbar, { wallet } from "components/Navbar";
import Dashboard from "./Dashboard";
import ProductCard from "components/ProductCard";

const xrpl = require("xrpl");

const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");



async function send() {
  const prepared = await client.autofill({
    TransactionType: "Payment",
    Account: wallet.address,
    Amount: xrpl.xrpToDrops("22"),
    Destination: "r3CCtTNSHxPwWETQXnaCJN9pG1dU2nSr1W",
  });
  const max_ledger = prepared.LastLedgerSequence;
  console.log("Prepared transaction instructions:", prepared);
  console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP");
  console.log("Transaction expires after ledger:", max_ledger);

  // Sign prepared instructions ------------------------------------------------
  const signed = wallet.sign(prepared);
  console.log("Identifying hash:", signed.hash);
  console.log("Signed blob:", signed.tx_blob);

  // Submit signed blob --------------------------------------------------------
  const tx = await client.submitAndWait(signed.tx_blob);

  // Check transaction results -------------------------------------------------
  console.log("Transaction result:", tx.result.meta.TransactionResult);
  console.log(
    "Balance changes:",
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
  );

  client.disconnect();
}

export default function DashBoardPage() {
  
  
  useEffect(() => {
    // This effect will run whenever the wallet state changes

  }, [wallet]);

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
