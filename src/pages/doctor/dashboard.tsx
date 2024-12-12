import React from "react";
import { NextPage } from "next";
import { BodySchema } from "~/features/user/dashboard/bodySchema";
import { PatientSection } from "~/features/doctor/dashboard/PatientsSection";
import { VisitsSection } from "~/features/doctor/dashboard/VisitsSection";
import { DrugsSection } from "~/features/doctor/dashboard/DrugsSection";
import { StatisticsSection } from "~/features/doctor/dashboard/StatisticsSection";

const UserDashboard: NextPage = () => {
  return (
    <div className="flex flex-wrap px-14">
      <div className="flex w-full flex-col gap-6 p-10 sm:w-1/3">
        <PatientSection />
        <VisitsSection />
      </div>

      <BodySchema />

      <div className="flex w-full flex-col gap-6 p-10 sm:w-1/3">
        <DrugsSection />
        <StatisticsSection />
      </div>
    </div>
  );
};

export default UserDashboard;
