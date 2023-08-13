import React, { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "components/ui/button";
import { useSelectedWallet } from "../app/SelectedWalletContext";
import { MessageSquare } from "lucide-react";
import cn from "classnames";

const xrpl = require("xrpl");

const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

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

  useEffect(() => {}, [selectedWallet]);

  const handleSendXRP = () => {
    if (selectedWallet) {
      sendXRP(selectedWallet, props.sellerAddress, props.cost);
    } else {
      console.error("Sender wallet is not defined.");
    }
  };

  const isSellMode = props.mode === "sell";

  return (
    <div className="container mx-auto max-w-sm p-4 shadow-md rounded-lg bg-white relative">
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
            <p className="absolute left-12 top-[-0px] text-white font-bold">
              Jack Marshal
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
          <img
            className="w-full h-full object-cover rounded-t-lg"
            src="honda.jpg"
            alt="Product Image"
          />
        </div>
      </div>

      <div className="px-3 py-1">
        {/* Rest of the card content */}
        <h2 className="text-lg font-semibold mb-1">{props.name}</h2>
        <p className="text-gray-700 text-sm mb-1">{props.description}</p>
        <div className="flex flex-wrap gap-3 mb-1">
          {/* Tags for the product */}
          <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-xs">
            {props.tag1}
          </span>
          <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-xs">
            {props.tag2}
          </span>
          <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-xs">
            {props.tag3}
          </span>
        </div>
        <div className="flex items-center mt-2 py-1">
          <span className="text-gray-800 font-semibold">
            Price: {props.cost} xrp
          </span>
        </div>

        <div className="flex mt-1 justify-between gap-3">
          {isSellMode ? (
            <>
              <button
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:text-white transition duration-200"
                )}
              >
                Edit
              </button>
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
              <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 text-xs">
                Add to Cart
              </button>
              <button
                onClick={handleSendXRP}
                className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 text-xs"
              >
                Buy
              </button>
              {/* Chat icon */}
              <Link
                href={`/message?sellerAddress=${props.sellerAddress}`}
                passHref
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
