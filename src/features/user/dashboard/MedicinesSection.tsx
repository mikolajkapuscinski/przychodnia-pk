import { DrugCard } from "~/components/cards/drugCard";
import { CustomDialog } from "~/components/CustomDialog";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { DrugModal } from "./DrugModal";
import { useState } from "react";
import { api } from "~/utils/api";
import { COMPILER_INDEXES } from "next/dist/shared/lib/constants";

export interface Drug {
  name: string;
  description: string;
}

export const MedicinesSection: React.FC = () => {
  const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<Drug>();

  const openDrugModal = (drug: Drug) => {
    setSelectedDrug(drug);
    setIsDrugModalOpen(true);
  };

  const drugsQuery = api.user.getPatientDrugs.useQuery().data;

  const drugs: Drug[] = drugsQuery
    ? drugsQuery
    : [{ name: "test_drug", description: "test_drug" }];

  return (
    <div className="py-4">
      <SectionTitle>Medications</SectionTitle>
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
