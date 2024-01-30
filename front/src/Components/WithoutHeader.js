import React from "react";
import { Outlet } from "react-router";

const WithoutHeader = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default WithoutHeader;
