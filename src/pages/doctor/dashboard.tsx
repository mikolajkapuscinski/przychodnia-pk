import React from "react";
import { NextPage } from "next";
import { BodySchema } from "~/features/user/dashboard/bodySchema";
import { PatientSection } from "~/features/doctor/dashboard/PatientsSection";
import { VisitsSection } from "~/features/doctor/dashboard/VisitsSection";
import { DrugsSection } from "~/features/doctor/dashboard/DrugsSection";
import { StatisticsSection } from "~/features/doctor/dashboard/StatisticsSection";
import { Navbar } from "~/components/navbar/Navbar";
import { Button } from "~/components/forms/Button";

const UserDashboard: NextPage = () => {
  return (
    // Left
    <div className="flex flex-wrap justify-between">
      <Navbar>
        <Button variant="secondary" size="base">
          Overview
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
      <div className="flex w-full flex-col gap-6 p-10 sm:w-1/3">
        <PatientSection />
      </div>

      {/* Middle */}
      <div className="flex w-full flex-col gap-6 p-10 sm:w-1/3">
        <VisitsSection />
      </div>

      {/* Right */}
      <div className="flex w-full flex-col gap-6 p-10 sm:w-1/3">
        <DrugsSection />
        <StatisticsSection />
      </div>
    </div>
  );
};

export default UserDashboard;
