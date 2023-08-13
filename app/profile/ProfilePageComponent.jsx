'use client'

import React, { useState } from "react";
import { UserProfile } from "@clerk/nextjs";
import ProductUpload from "../product_upload/ProductUpload";
import { Pencil, Star } from 'lucide-react'; // Import the edit and star icons

const ProfilePageComponent = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [about, setAbout] = useState("Lorem ipsum dolor sit amet...");
  const [location, setLocation] = useState("New York, USA");
  const [website, setWebsite] = useState("https://example.com");
  const [role, setRole] = useState("Web Developer");
  const [rating, setRating] = useState(4.5); // Example star rating

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    // Perform any save/update actions here, like updating user profile
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Reset the fields to their original values
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 relative">
          {/* Edit Icon */}
          <button
            onClick={handleEditClick}
            className="absolute top-4 right-4 text-gray-600 hover:text-blue-500"
          >
            <Pencil size={24} />
          </button>

          <div className="flex items-center">
            <img
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
              src="profile.jpg"
              alt="Profile"
            />
            <div className="ml-4">
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xl font-semibold w-40"
                />
              ) : (
                <h1 className="text-xl font-semibold">{name}</h1>
              )}
              {editing ? (
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="text-gray-600 mt-1"
                />
              ) : (
                <p className="text-gray-600">{role}</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            {editing ? (
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="text-gray-600 w-full h-24 resize-none"
              />
            ) : (
              <p className="text-gray-600">{about}</p>
            )}
          </div>
          <div className="mt-4">
            <div className="flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                />
              </svg>
              {editing ? (
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              ) : (
                <span>{location}</span>
              )}
            </div>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {website}
            </a>
          </div>
          <div className="flex items-center mt-4">
            {/* Star Rating */}
            <Star className="text-yellow-500 mr-1" size={18} />
            <p className="text-gray-600">{rating.toFixed(1)}</p>
          </div>
          {editing && (
            <div className="mt-4">
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 transition duration-200"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          )}
          <ProductUpload />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;
