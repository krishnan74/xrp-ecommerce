'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Button } from "components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { ShoppingBagIcon } from "lucide-react";
import { buttonVariants } from "components/ui/button";
import { useSelectedWallet } from "../app/SelectedWalletContext";
import { MessageSquare } from "lucide-react";

import cn from "classnames";
import Image from "next/image";

const xrpl = require("xrpl");

const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

const supabase = createClient(
  "https://fveklwaemqucyxsrbmhv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTMyNTc2MSwiZXhwIjoyMDA2OTAxNzYxfQ.xukOaFj-7g5OP2DEiBgK5BFg_BxvUgV2YVoxGDUc70I"
);

async function getAccountBalance(accountAddress) {
  try {
    await client.connect();

    const response = await client.request({
      command: "account_info",
      account: accountAddress,
    });

    if (response.result && response.result.account_data) {
      const xrpBalance = xrpl.dropsToXrp(response.result.account_data.Balance);
      return xrpBalance;
    } else {
      console.error("Error fetching account info:", response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function sendXRP(senderWallet, receiverAddress, cost) {
  try {
    await client.connect();
    const prepared = await client.autofill({
      TransactionType: "Payment",
      Account: senderWallet.address,
      Amount: xrpl.xrpToDrops(cost),
      Destination: receiverAddress,
    });
    const max_ledger = prepared.LastLedgerSequence;
    console.log("Prepared transaction instructions:", prepared);
    console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP");
    console.log("Transaction expires after ledger:", max_ledger);

    // Sign prepared instructions ------------------------------------------------
    const signed = senderWallet.sign(prepared);
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
  } catch (error) {
    console.log("Error" + error);
  }
}

const ProductCard = (props) => {
  const { selectedWallet } = useSelectedWallet();
  const [imageURL, setImageURL] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [balance, setBalance] = useState(null);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowConfirmation(true);
  };

  const handleCancelPurchase = () => {
    setSelectedProduct(null);
    setShowConfirmation(false);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (selectedWallet) {
        const accountBalance = await getAccountBalance(selectedWallet.classicAddress);
        setBalance(accountBalance);
      }
    };

    fetchBalance();
  }, [selectedWallet]);

  useEffect(() => { }, [selectedWallet]);
  useEffect(() => { }, [balance]);
  

  useEffect(() => {
    const fetchImage = async () => {
      // Replace 'images' with your actual Supabase storage bucket name
      const { data, error } = await supabase.storage
        .from("images")
        .download(props.productImage);

      if (error) {
        console.error("Error fetching image:", error);
      } else {
        // Convert the retrieved image data to a URL
        const url = URL.createObjectURL(data);
        setImageURL(url);
      }
    };

    fetchImage();
  }, []);

  const handleSendXRP = () => {

    setSelectedProduct(null);
    setShowConfirmation(false);

    if (selectedWallet) {
      sendXRP(selectedWallet, props.sellerAddress, props.cost);
    } else {
      console.error("Sender wallet is not defined.");
    }
  };

  const isSellMode = props.mode === "sell";

  return (
    <div className="container mx-auto max-w-sm p-4 shadow-md rounded-lg bg-white relative">
      {showConfirmation && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Purchase</h2>
            {selectedProduct && (
              <div className="mb-4">
                <p className="text-gray-600">
                  Are you sure you want to purchase the following item?
                </p>
                <p className="font-semibold">{props.name}</p>
                <p>Cost: {props.cost} xrp</p>
                <p>Your XRP Balance: {balance !== null ? balance : "Loading..."}</p>
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleCancelPurchase}
                className="px-4 py-2 mr-2 text-gray-600 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendXRP}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="relative z-10">
        {!isSellMode ? (
          <>
            <div className="absolute top-[-10px] left-[-10px] rounded-full bg-black w-12 h-12 flex items-center justify-center">
              {/* Circular photo goes here */}
              <img
                className="w-11 h-11 rounded-full object-cover"
                src="profile.jpg"
                alt="Profile"
              />
            </div>
            <p className="absolute left-12 top-[0px] text-white font-bold">
              {props.sellerName}
            </p>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="relative">
        <div className="w-full h-32 overflow-hidden rounded-t-lg">
          {/* Product photo with gradient overlay goes here */}

          <div className="w-full h-full bg-gradient-to-b from-black via-transparent to-white absolute top-0 left-0 rounded-t-lg z-0"></div>

          {imageURL ? (
            <img
              src={imageURL}
              alt="Product Image"
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </div>

      <div className="px-3 py-1">
        {/* Rest of the card content */}
        <h2 className="text-lg font-semibold mb-1">{props.name}</h2>
        <p className="text-gray-700 text-sm mb-1">{props.description}</p>
        <div className="flex flex-wrap gap-3 mb-1">
          {/* Tags for the product */}
          <span className="px-3 py-1 bg-gray-200 text-black rounded-md text-xs">
            {props.tag1}
          </span>
          <span className="px-3 py-1 bg-gray-200 text-black rounded-md text-xs">
            {props.tag2}
          </span>
          <span className="px-3 py-1 bg-gray-200 text-black rounded-md text-xs">
            {props.tag3}
          </span>
        </div>
        <div className="flex items-center mt-2 py-1">
          <span className="text-black font-semibold">
            Price: {props.cost} xrp
          </span>
        </div>

        <div className="flex mt-1 justify-between gap-3">
          {isSellMode ? (
            <>
              <Button variant="outline" className="px-8 py-2 ">
                Edit
              </Button>
              <button
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                )}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <Button variant="secondary">
                <ShoppingCartIcon className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button onClick={handleBuyClick}>
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                Buy
              </Button>
              {/* Chat icon */}
              <Link
                href={{
                  pathname: "message",
                  query: {
                    sellerAddress: props.sellerAddress,
                    sellerName: props.sellerName,
                    messageMode: "new",
                  },
                }}
              >
                <button className={buttonVariants({ variant: "outline" })}>
                  <MessageSquare className="text-gray-600" size={18} />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
