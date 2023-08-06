'use client'

import React, { useState } from 'react';
import { buttonVariants } from 'components/ui/button';
import { UserButton } from '@clerk/nextjs';

const xrpl = require('xrpl')

const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
let wallet = null;

async function createNewAccount() {
  await client.connect();
  // Create a wallet and fund it with the Testnet faucet:
  const fund_result = await client.fundWallet();
  wallet = fund_result.wallet;
  console.log(fund_result);
}

async function connectExistingWallet() {
    
}
  


const Navbar = () => {
  const [showConnectDiv, setShowConnectDiv] = useState(false);
    var [walletAddress, setWalletAddress] = useState('');
  const [connectInput, setConnectInput] = useState('');
  const [accountInput, setAccountInput] = useState('');

  const toggleConnectDiv = () => {
    setShowConnectDiv(!showConnectDiv);
  };
  
  const handleConnect = () => {
      walletAddress = connectInput;
  };
    
  async function connectNewWallet() {
    await client.connect();
      try {
        wallet = xrpl.Wallet.fromSeed(accountInput)
        console.log(wallet);
        const classicAddress = wallet.classicAddress;
          return { wallet, classicAddress };
      
      } 
      catch (error) {
          alert("Invalid secret key!!! Account does not exist")
    }
    
  }
  

  const handleCreateAccount = async () => {
    // Implement logic to handle creating an account
      const { wallet, classicAddress } = await connectNewWallet()
      if (wallet) {
        setWalletAddress(classicAddress);
        toggleConnectDiv();
      } 

    console.log('Creating account with input:', accountInput);
  };

  return (
    <div className='flex justify-evenly items-center fixed w-full border-b-2 h-17 py-3 z-30 bg-white'>
      <h1>XRP - ECommerce</h1>
          <p>{walletAddress}</p>
          <button onClick={toggleConnectDiv} className={buttonVariants({ variant: "outline" })}>Connect</button>
          <button onClick={createNewAccount} className={buttonVariants({ variant: "outline" })}>ConnectDemo</button>
      
          <UserButton afterSignOutUrl="/" />
      {showConnectDiv && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              {/* Connect Side */}
              <div>
                <h2>Connect</h2>
                <input
                  type="text"
                  value={connectInput}
                  onChange={(e) => setConnectInput(e.target.value)}
                  placeholder="Enter xrp account secret key"
                />
                <button onClick={handleConnect}>Connect</button>
              </div>
              {/* Create Account Side */}
              <div>
                <h2>Create Account</h2>
                <input
                  type="text"
                  value={accountInput}
                  onChange={(e) => setAccountInput(e.target.value)}
                  placeholder="Enter account details"
                />
                <button onClick={handleCreateAccount}>Create Account</button>
              </div>
            </div>
            <button onClick={toggleConnectDiv}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
