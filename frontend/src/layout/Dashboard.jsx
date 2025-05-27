import React from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "../components/userMenu";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const user = useSelector(state => state.user);
  return (
    // <section className="bg-neutral-100">
    //   <div className="container mx-auto p-3 flex ">
    //     <div className="py-4 sticky top-24 max-h-[calc(100vh-100px)] overflow-y-auto hidden lg:block border-r">
    //       <UserMenu />
    //     </div>
    //     <div className="bg-neutral-100 min-h-[75vh]  ">
    //       <Outlet />
    //     </div>
    //   </div>
    // </section>
    <>
      <section className="flex w-full bg-neutral-100 p-5 container mx-auto ">
        <div className="w-1/4 lg:block hidden ">
          <UserMenu />
        </div>
        {/* <div className="border-1  col-span-1 hidden  lg:block w-0.24 h-screen"></div> */}
        <div className="border-r border-slate-300 h-100vh  hidden  lg:block "></div>
        <div className="lg:w-3/4 w-full">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
