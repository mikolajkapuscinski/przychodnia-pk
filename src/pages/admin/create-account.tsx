import React from "react";
import { NextPage } from "next";
import { CreateAccountForm } from "../../features/admin/create-account/CreateAccountForm";


const CreateAccountPage: NextPage = () => {
  return (
    <div className="bg-backgound flex items-center justify-center h-screen">
      <CreateAccountForm />
    </div>
  );
};

export default CreateAccountPage;
