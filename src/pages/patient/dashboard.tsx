import React, { useState, useEffect } from "react";
import { type NextPage } from "next";
import { Navbar } from "~/components/navbar/Navbar";
import { BodySchema } from "~/features/user/dashboard/bodySchema";
import { LeftSection } from "~/features/user/dashboard/leftSection";
import { RightSection } from "~/features/user/dashboard/rightSection";
import { Button } from "~/components/forms/Button";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const UserDashboard: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [filteredHistory, setFilteredHistory] = useState<any[]>([]);

  const medicalHistory =
    api.medicalHistory.getMyMedicalHistory.useQuery().data ?? [];

  useEffect(() => {
    if (selectedRegion) {
      const filtered = medicalHistory.filter(
        (history) => history.region === selectedRegion,
      );
      setFilteredHistory(filtered);
    }
  }, [selectedRegion, medicalHistory]);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <>
      <Navbar>
        <Button
          variant="secondary"
          size="base"
          onClick={() => {
            router.push(`/${sessionData?.user?.role?.toLowerCase()}/dashboard`);
          }}
        >
          Dashboard
        </Button>
        <Button
          variant="primary"
          size="base"
          onClick={() => {
            router.push("create-visit");
          }}
        >
          Schedule&nbsp;visit
        </Button>
        <Button variant="secondary" size="base">
          Doctors
        </Button>
        <Button variant="secondary" size="base">
          Medications
        </Button>
      </Navbar>
      <div className="grid w-full grid-cols-1 justify-between md:grid-cols-3">
        <LeftSection />
        <BodySchema
          selectedRegion={selectedRegion}
          medicalHistory={medicalHistory}
          onRegionClick={handleRegionClick}
        />
        <RightSection
          selectedRegion={selectedRegion}
          filteredHistory={filteredHistory}
        />
      </div>
    </>
  );
};

export default UserDashboard;
