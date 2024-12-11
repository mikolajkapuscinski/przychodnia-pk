import React from "react";
import { NextPage } from "next";
import { Visit } from "~/features/doctor/Visit";

const VisitPage: NextPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-backgound">
      <Visit />
    </div>
  );
};

export default VisitPage;
