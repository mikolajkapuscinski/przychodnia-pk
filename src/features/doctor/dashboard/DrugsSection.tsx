import { DrugCard } from "~/components/cards/drugCard";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { MedicationDatabase } from "../MedicationDatabase";
import { CustomDialog } from "~/components/CustomDialog";
import { useState } from "react";

interface DrugsSectionProps {}

export const DrugsSection: React.FC<DrugsSectionProps> = (
  p: DrugsSectionProps,
) => {
  const [isMedicationDatabaseOpen, setIsMedicationDatabaseOpen] =
    useState(false);

  const openMedicationDatabase = () => {
    setIsMedicationDatabaseOpen(true);
  };

  const closeMedicationDatabase = () => {
    setIsMedicationDatabaseOpen(false);
  };

  const medicines = [
    { id: 1, name: "Aspirin", description: "Pain relief medication" },
    { id: 2, name: "Ibuprofen", description: "Anti-inflammatory drug" },
  ];

  return (
    <div className="py-4">
      <SectionTitle results={11004} onclick={openMedicationDatabase}>
        Medications Database
      </SectionTitle>
      <div className="grid place-items-center items-stretch gap-x-2 gap-y-3 lg:grid-cols-1 2xl:grid-cols-2">
        <DrugCard title="Paracetamol">
          <img
            className="w-full rounded-lg"
            src="/medicine-1.jpeg"
            alt="drug"
          />
        </DrugCard>
        <DrugCard title="Fentanyl">
          <img className="rounded-lg" src="/medicine-2.jpg" alt="drug" />
        </DrugCard>
      </div>
      <CustomDialog
        isOpen={isMedicationDatabaseOpen}
        onClose={closeMedicationDatabase}
      >
        <MedicationDatabase medicines={medicines} />
      </CustomDialog>
    </div>
  );
};
