import React from "react";

const ProductCard = (props) => {
  return (
    <div className="container mx-auto max-w-sm p-4 shadow-md rounded-lg bg-white relative">
      <div className="relative z-10">
        <div className="absolute top-[-15px] left-[-10px] rounded-full bg-black w-12 h-12 flex items-center justify-center">
          {/* Circular photo goes here */}
          <img
            className="w-11 h-11 rounded-full object-cover"
            src="profile.jpg"
            alt="Profile"
          />
        </div>
        <p className="absolute left-12 top-[-0px] text-white font-bold">Jack Marshal</p>
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
          <span className="text-gray-800 font-semibold">Price: {props.cost} xrp</span>
        </div>
        <div className="flex mt-1 justify-between">
          <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 text-xs">
            Add to Cart
          </button>
          <button className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 text-xs">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
