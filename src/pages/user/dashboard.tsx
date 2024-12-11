import React from "react";
import { NextPage } from "next";
import { Navbar } from "~/components/navbar/Navbar";
import { BodySchema } from "~/features/user/dashboard/bodySchema";
import { LeftSection } from "~/features/user/dashboard/leftSection";
import { RightSection } from "~/features/user/dashboard/rightSection";

const UserDashboard: NextPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="w-full md:flex">
        <LeftSection></LeftSection>
        <BodySchema></BodySchema>
        <RightSection></RightSection>
      </div>
    </>
  );
};

export default UserDashboard;
