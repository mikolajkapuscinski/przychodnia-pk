import React, { useEffect, useState } from "react";
import { Button } from "~/components/forms/Button";
import { Line } from "~/components/forms/Line";
import { Select } from "~/components/forms/Select";
import { Title } from "~/components/forms/Title";
import { api } from "~/utils/api";
import { VisitOffer } from "./VisitOffer";

type DoctorWithDetails = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  specialization: { id: string; name: string }[];
  opinions?: any;
};

export const VisitSearch: React.FC = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const allSpecialization = api.specialization.getAllSpecializations.useQuery();

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSpecialization(e.target.value);
  };

  const [filteredDoctors, setFilteredDoctors] = useState<DoctorWithDetails[]>(
    [],
  );

  const allDoctors = api.user.findDoctors.useQuery();

  useEffect(() => {
    if (allDoctors.data) {
      setFilteredDoctors(allDoctors.data);
    }
  }, [allDoctors.data]);

  const handleSearch = () => {
    const filtered = allDoctors.data?.filter((doctor) =>
      doctor.specialization?.some((spec) => spec.id === selectedSpecialization),
    );

    setFilteredDoctors(filtered || []);
  };

  const opinionSummary = api.opinion.getOpinionSummary.useQuery();
  const opinionMap = opinionSummary.data ?? {};

  return (
    <>
      <div className="mx-auto mt-20 w-full max-w-4xl rounded-2xl bg-default-white p-6">
        <Title>Book an appointment</Title>
        <Line />
        <div className="mt-5 flex items-center space-x-4">
          <div className="flex-grow-[3]">
            <Select
              id="visit-search"
              name="visit-search"
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
              placeholder="Choose specialization"
              options={
                allSpecialization.data?.map((specialization) => ({
                  value: specialization.id,
                  label: specialization.name,
                })) || []
              }
            />
          </div>
          <div className="flex-grow-[1]">
            <Button onClick={handleSearch} variant={"primary"} size={"base"}>
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {filteredDoctors.map((doctor, i) => (
          <VisitOffer
            key={i}
            firstName={doctor.firstName || ""}
            lastName={doctor.lastName || ""}
            specialization={doctor.specialization || []}
            opinion={opinionMap[doctor.id] || { rating: 0, count: 0 }}
            doctorId={doctor.id}
          />
        ))}
      </div>
    </>
  );
};
