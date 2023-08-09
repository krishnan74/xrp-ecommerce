'use client'
import React, { createContext, useContext, useState } from 'react';

const SelectedWalletContext = createContext();

export const SelectedWalletProvider = ({ children }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  return (
    <SelectedWalletContext.Provider value={{ selectedWallet, setSelectedWallet }}>
      {children}
    </SelectedWalletContext.Provider>
  );
};

export const useSelectedWallet = () => {
  return useContext(SelectedWalletContext);
};
