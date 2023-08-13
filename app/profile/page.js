import React from "react";
import Navbar from "components/Navbar";
import ProfilePageComponent from "./ProfilePageComponent"

const ProfilePage = () => {
    return (
        <div className="page-container">
        <div className="">
          <Navbar />
        </div>
      <div className="h-12"></div>
        <div className="">
          <ProfilePageComponent></ProfilePageComponent>
        </div>
      </div>
      );
};

export default ProfilePage;
