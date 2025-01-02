import React from "react";
import { type NextPage } from "next";
import { Navbar } from "~/components/navbar/Navbar";
import { BodySchema } from "~/features/user/dashboard/bodySchema";
import { LeftSection } from "~/features/user/dashboard/leftSection";
import { RightSection } from "~/features/user/dashboard/rightSection";
import { Button } from "~/components/forms/Button";

const UserDashboard: NextPage = () => {
  return (
    <>
      <Navbar>
        <Button variant="secondary" size="base">
          Overview
        </Button>
        <Button variant="secondary" size="base">
          Calendar
        </Button>
        <Button variant="secondary" size="base">
          Doctors
        </Button>
        <Button variant="secondary" size="base">
          Medications
        </Button>
      </Navbar>
      <div className="grid w-full grid-cols-1 justify-between md:grid-cols-3">
        <LeftSection></LeftSection>
        <BodySchema></BodySchema>
        <RightSection></RightSection>
      </div>
    </>
  );
};

export default UserDashboard;
