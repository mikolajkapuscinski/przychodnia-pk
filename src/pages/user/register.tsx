import React from "react";
import { type NextPage } from "next";
import { RegisterForm } from "~/features/user/register/RegisterForm";

const RegisterPage: NextPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-backgound">
      <RegisterForm
        onRegisterSuccess={() => {
          console.log("register success, cool!");
        }}
      />
    </div>
  );
};

export default RegisterPage;
