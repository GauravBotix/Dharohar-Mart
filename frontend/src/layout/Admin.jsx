import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

const Admin = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <section className="min-h-[65vh] px-4 pl-4 pr-4 ">
      {isAdmin(user?.role) ? (
        children
      ) : (
        <p className="font-semibold text-white p-3   bg-red-500 text-center rounded ">
          Don't have permission to access the ADMIN Pannel.
        </p>
      )}
    </section>
  );
};

export default Admin;
