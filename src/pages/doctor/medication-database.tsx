import React, { useEffect, useState } from "react";
import { type NextPage } from "next";
import { MedicationDatabase } from "~/features/doctor/MedicationDatabase";
import { Navbar } from "~/components/navbar/Navbar";
import { Button } from "~/components/forms/Button";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const MedicationDatabasePage: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Navbar>
        <Button
          variant="secondary"
          size="base"
          onClick={async () => {
            await router.push(`/${sessionData?.user?.role?.toLowerCase()}/dashboard`);
            console.log("clicked on overview");
          }}
        >
          Dashboard
        </Button>
        <Button variant="secondary" size="base">
          Calendar
        </Button>
        <Button
          variant="secondary"
          size="base"
          onClick={async () =>
            await router.push(
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
      <div className="mx-auto my-14 w-3/4 rounded-2xl bg-default-white p-6">
        <MedicationDatabase />
      </div>
    </>
  );
};

export default MedicationDatabasePage;
