import React from "react";
import { NextPage } from "next";
import { CreateStaffAccountForm } from "../../features/admin/create-account/CreateStaffAccountForm";

const CreateAccountPage: NextPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-backgound">
      <CreateStaffAccountForm />
    </div>
  );
};

export default CreateAccountPage;
