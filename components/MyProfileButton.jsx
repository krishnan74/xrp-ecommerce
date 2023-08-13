import { UserButton, UserProfile } from "@clerk/nextjs";
import { useState } from "react";

const MyProfileButton = () => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfileModal = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="relative flex">
      <div>
        <button onClick={toggleProfileModal}>
          
        </button>
      </div>

      {showProfile && (
        <div className="absolute bg-white rounded-md shadow-md p-2  right-0  z-10 w-40">
          My Profile
        </div>
      )}
    </div>
  );
};

export default MyProfileButton;
