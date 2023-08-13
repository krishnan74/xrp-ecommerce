"use client"
import React from "react";
import Navbar from "components/Navbar";
import ProfilePageComponent from "./ProfilePageComponent"
import { WithUser } from "@clerk/nextjs";

const ProfilePage = () => {

  return (
    <WithUser>
      {(user) => (
        <div className="page-container">
          <div className="">
            <Navbar />
          </div>
          <div className="h-12"></div>
          <div className="">
            <ProfilePageComponent user = {user}></ProfilePageComponent>
          </div>
        </div>
      )}
    </WithUser>
  );
};

export default ProfilePage;
