import React from "react";
import Header from "./Header.js";
import { Outlet } from "react-router";

const WithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default WithHeader;
