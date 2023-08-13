'use client'
import React, { useEffect, useState } from 'react';
import { buttonVariants } from 'components/ui/button';
import { User } from 'lucide-react';
import { createClient } from "@supabase/supabase-js";
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useSelectedWallet } from '../app/SelectedWalletContext';
import { UserButton } from '@clerk/nextjs';
import MyProfileButton from './MyProfileButton';

const xrpl = require('xrpl');

const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');

const supabase = createClient(
  "https://fveklwaemqucyxsrbmhv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2ZWtsd2FlbXF1Y3l4c3JibWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTMyNTc2MSwiZXhwIjoyMDA2OTAxNzYxfQ.xukOaFj-7g5OP2DEiBgK5BFg_BxvUgV2YVoxGDUc70I"
);

const fetchCurrentWallet = async (currentWallet) => {
  const { error } = await supabase
    .from('CurrentXRPUser')
    .update({ wallet: currentWallet })
    .eq('id', 1)
};

const Navbar = () => {
  const [showConnectDiv, setShowConnectDiv] = useState(false);
  const [showWalletDiv, setShowWalletDiv] = useState(false);
  const [wallets, setWallets] = useState([]);
  const { selectedWallet, setSelectedWallet } = useSelectedWallet();
  // const [selectedWallet, setSelectedWallet] = useState(null); // Selected wallet state
  const [connectInput, setConnectInput] = useState('');
  const [accountInput, setAccountInput] = useState('');

  useEffect(() => {
      
    // This effect will run whenever the wallet state changes
  }, [wallets, selectedWallet]);

  useEffect(() => {
    // Load selectedWallet from localStorage on page load
    const savedSelectedWallet = localStorage.getItem("selectedWallet");
    console.log(JSON.parse(savedSelectedWallet));
    if (savedSelectedWallet) {
      setSelectedWallet(JSON.parse(savedSelectedWallet));
    }
  }, []);

  useEffect(() => {
    // Save selectedWallet to localStorage whenever it changes
    if (selectedWallet) {
      localStorage.setItem("selectedWallet", JSON.stringify(selectedWallet));
    }
  }, [selectedWallet]);

  const toggleConnectDiv = () => {
    setShowConnectDiv(!showConnectDiv);
  };

  const toggleWalletConnectDiv = () => {
    setShowWalletDiv(!showWalletDiv);
  };

  async function createNewWallet() {
    await client.connect();
    const fund_result = await client.fundWallet();
    const newWallet = fund_result.wallet;
    setWallets([...wallets, newWallet]);
    setSelectedWallet(newWallet); // Set the newly created wallet as selected
    toggleConnectDiv();
  }

  async function connectWallet() {
    await client.connect();
    try {
      const newWallet = xrpl.Wallet.fromSeed(connectInput);
      setWallets([...wallets, newWallet]);
      setSelectedWallet(newWallet); // Set the connected wallet as selected
      toggleConnectDiv();
      setConnectInput('');
    } catch (error) {
      console.log(error);
      alert('Invalid secret key!!! Account does not exist');
    }
  }
  return (
    <div className="flex justify-evenly items-center fixed w-full border-b-2 h-17 py-3 z-30 bg-white">
      <Link href={"dashboard"}>
        <h1>XRP - ECommerce</h1>
      </Link>
      <div className="relative">
        <button
          className={buttonVariants({ variant: "outline" })}
          onClick={toggleWalletConnectDiv}
        >
          <User className="mr-3" />
          {selectedWallet ? selectedWallet.classicAddress : "Select Wallet"}
        </button>
        {showWalletDiv && (
          <div className="absolute top-10 right-0 bg-white p-4 rounded-md shadow-md">
            {wallets.map((wallet) => (
              <button
                key={wallet.classicAddress}
                className="block w-full py-2 px-4 text-left hover:bg-gray-100"
                onClick={() => setSelectedWallet(wallet)}
              >
                {wallet.classicAddress}
              </button>
            ))}
          </div>
        )}
      </div>
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
      
      <Link href={"profile"}>
        <button className={buttonVariants({ variant: "outline" })}>
          My Profile
        </button>
      </Link>
      
      <UserButton
            afterSignOutUrl="/"
            userProfileMode="modal"
            userProfileUrl="/profile"
          />

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

