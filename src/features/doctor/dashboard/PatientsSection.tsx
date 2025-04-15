import React, { useState } from "react";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { PatientBlock } from "./PatientBlock";
import { CustomDialog } from "~/components/CustomDialog";
import PatientDescription from "./PatientDescription";
import { api } from "~/utils/api";

type PatientSectionProps = unknown;

export const PatientSection: React.FC<PatientSectionProps> = () => {
  const [isPatientDescriptionOpen, setIsPatientDescriptionOpen] =
    useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Otwieranie dialogu z pacjentem
  const openPatientDescription = (patient: any) => {
    setSelectedPatient(patient);
    setIsPatientDescriptionOpen(true);
  };

  // Zamknięcie dialogu
  const closePatientDescription = () => {
    setSelectedPatient(null);
    setIsPatientDescriptionOpen(false);
  };

  const { data: patientsData } = api.user.getMyPatients.useQuery();

  return (
    <div>
      <SectionTitle results={patientsData?.length}>My Patients</SectionTitle>
      <div className="flex flex-col gap-y-2">
        {patientsData
          ?.slice(0, 7)
          .map((patient: any, index: number) => (
            <PatientBlock
              key={index}
              {...patient}
              onViewHistory={() => openPatientDescription(patient)}
            />
          ))}
      </div>
      {selectedPatient && (
        <CustomDialog
          isOpen={isPatientDescriptionOpen}
          onClose={closePatientDescription}
        >
          <PatientDescription
            {...selectedPatient}
            closeDialog={closePatientDescription}
          />
        </CustomDialog>
      )}
    </div>
  );
};
