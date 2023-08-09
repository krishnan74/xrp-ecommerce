'use client'

import React, { useEffect, useState } from 'react';
import { buttonVariants } from 'components/ui/button';
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const xrpl = require("xrpl");

const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

const Navbar = () => {
  const [showConnectDiv, setShowConnectDiv] = useState(false);
  const [wallet, setWallet] = useState(null); // Use state to manage wallet
  const [connectInput, setConnectInput] = useState("");
  const [accountInput, setAccountInput] = useState("");

  useEffect(() => {
    // This effect will run whenever the wallet state changes
  }, [wallet]);

  const toggleConnectDiv = () => {
    setShowConnectDiv(!showConnectDiv);
  };

  async function createNewWallet() {
    await client.connect();
    // Create a wallet and fund it with the Testnet faucet:
    const fund_result = await client.fundWallet();
    setWallet(fund_result.wallet);
    if (fund_result) {
      toggleConnectDiv();
    }
    console.log(fund_result);
  }

  async function connectWallet() {
    await client.connect();
    try {
      const NewWallet = xrpl.Wallet.fromSeed(connectInput);
      setWallet(NewWallet);

      if (NewWallet) {
        toggleConnectDiv();
      }
      console.log(NewWallet);
      setConnectInput("");
    } catch (error) {
      console.log(error);
      alert("Invalid secret key!!! Account does not exist");
    }
  }

  return (
    <div className="flex justify-evenly items-center fixed w-full border-b-2 h-17 py-3 z-30 bg-white">
      <h1>XRP - ECommerce</h1>
      <button className={buttonVariants({ variant: "outline" })}>
        {wallet ? wallet.address : ""}
      </button>
      
      <button
        onClick={toggleConnectDiv}
        className={buttonVariants({ variant: "outline" })}
      >
        Connect Wallet
      </button>
      <Link href={"message"}>
        <button className={buttonVariants({ variant: "outline" })}>
          <MessageSquare />
        </button>
      </Link>
      <UserButton afterSignOutUrl="/" />
      {showConnectDiv && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Connect Side */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Connect</h2>
                <input
                  type="text"
                  value={connectInput}
                  onChange={(e) => setConnectInput(e.target.value)}
                  placeholder="Enter xrp account secret key (seed)"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={connectWallet}
                  className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Connect Wallet
                </button>
              </div>
              {/* Create Account Side */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Create Account</h2>
                <input
                  type="text"
                  value={accountInput}
                  onChange={(e) => setAccountInput(e.target.value)}
                  placeholder="Enter account details"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={createNewWallet}
                  className="mt-3 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Create Wallet
                </button>
              </div>
            </div>
            <button
              onClick={toggleConnectDiv}
              className="flex items-center justify-center w-full bg-gray-200 text-gray-600 py-2 rounded-md hover:bg-gray-300 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
