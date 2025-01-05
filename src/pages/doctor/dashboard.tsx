import React, { useEffect, useState } from "react";
import { type NextPage } from "next";
import { PatientSection } from "~/features/doctor/dashboard/PatientsSection";
import { VisitsSection } from "~/features/doctor/dashboard/VisitsSection";
import { DrugsSection } from "~/features/doctor/dashboard/DrugsSection";
import { StatisticsSection } from "~/features/doctor/dashboard/StatisticsSection";
import { Navbar } from "~/components/navbar/Navbar";
import { Button } from "~/components/forms/Button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const DoctorDashboard: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-wrap justify-between">
      <Navbar>
        <Button
          variant="secondary"
          size="base"
          onClick={() => {
            router.push(`/${sessionData?.user?.role?.toLowerCase()}/dashboard`);
            console.log("clicked on overview");
          }}
        >
          Overview
        </Button>
        <Button variant="secondary" size="base">
          Calendar
        </Button>
        <Button
          variant="secondary"
          size="base"
          onClick={() =>
            router.push(
              `/${sessionData?.user?.role?.toLowerCase()}/medication-database`,
            )
          }
        >
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

export default DoctorDashboard;
