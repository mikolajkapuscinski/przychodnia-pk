import React from "react";
import { NextPage } from "next";
import { CreateAccountForm } from "../../features/admin/create-account/CreateAccountForm"


const CreateAccountPage: NextPage = () => {
  return (
    <div>
      <CreateAccountForm />
    </div>
  );
};

export default CreateAccountPage;
