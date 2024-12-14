import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import SideBar from "../Sidebar1/Sidebar1";


const MasterLayout = ({ loginData }) => {
  return (
    <>
      <div className="dashboard-container">
     
        <div className="d-flex side-bar ">
              <div className="sidebar-container">
                <SideBar/>
              </div>
              <div className="w-100">
                <Navbar/>
                <Outlet/>
              </div>
        </div>
      </div>
    </>
  );
};
export default MasterLayout;
