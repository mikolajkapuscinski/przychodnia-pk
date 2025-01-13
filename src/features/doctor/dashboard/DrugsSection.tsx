import { useRouter } from "next/router";
import { useState } from "react";
import { DrugCard } from "~/components/cards/drugCard";
import { CustomDialog } from "~/components/CustomDialog";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { DrugModal } from "~/features/user/dashboard/DrugModal";
import { Drug } from "~/features/user/dashboard/MedicinesSection";
import { api } from "~/utils/api";

type DrugsSectionProps = unknown;

export const DrugsSection: React.FC<DrugsSectionProps> = (
  p: DrugsSectionProps,
) => {
  const router = useRouter();

  const redirectToMedicationDatabase = () => {
    void router.push("medication-database");
  };

  const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<Drug>();

  const openDrugModal = (drug: Drug) => {
    setSelectedDrug(drug);
    setIsDrugModalOpen(true);
  };

  const drugs: Drug[] = [
    {
      name: "Ibuprofen",
      description:
        "Dosage form: TABLET, FILM COATED Packaging: 90 TABLET, FILM COATED in 1 BOTTLE (71335-2068-0)",
    },
    {
      name: "diazepam",
      description:
        "Dosage form: TABLET Packaging: 30 TABLET in 1 BOTTLE, PLASTIC (71335-2247-1)",
    },
  ];

  return (
    <div className="py-4">
      <SectionTitle results={139725} onclick={redirectToMedicationDatabase}>
        Medications
      </SectionTitle>
      <div className="grid place-items-center items-stretch gap-x-2 gap-y-3 lg:grid-cols-1 2xl:grid-cols-2">
        {drugs.slice(0, 4).map((drug, idx) => (
          <DrugCard
            key={idx}
            title={drug.name}
            onClick={() => openDrugModal(drug)}
          >
            <img
              className="w-full rounded-lg"
              src={`/medicine-${idx % 4}.jpg`}
              alt="drug"
            />
          </DrugCard>
        ))}
      </div>
      <CustomDialog
        isOpen={isDrugModalOpen}
        onClose={() => setIsDrugModalOpen(false)}
      >
        <DrugModal
          name={selectedDrug?.name ?? ""}
          description={selectedDrug?.description ?? ""}
        ></DrugModal>
      </CustomDialog>
    </div>
  );
};
