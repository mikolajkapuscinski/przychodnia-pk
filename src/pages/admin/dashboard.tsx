import React from "react";
import { type NextPage } from "next";
import { CreateStaffAccountForm } from "../../features/admin/create-account/CreateStaffAccountForm";
import { Navbar } from "~/components/navbar/Navbar";
import { Button } from "~/components/forms/Button";

const CreateAccountPage: NextPage = () => {
  return (
    <div>
      <Navbar>
        <Button variant="secondary" size="base">
          Dashboard
        </Button>
        <Button variant="secondary" size="base">
          Calendar
        </Button>
        <Button variant="secondary" size="base">
          Medications
        </Button>
        <Button variant="secondary" size="base">
          Statistics
        </Button>
      </Navbar>
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-backgound">
        <CreateStaffAccountForm />
      </div>
    </div>
  );
};

export default CreateAccountPage;
