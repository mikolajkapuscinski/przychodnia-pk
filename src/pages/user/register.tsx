import React from "react";
import { NextPage } from "next";
import { RegisterForm } from "~/features/user/register/RegisterForm";

const RegisterPage: NextPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-backgound">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
