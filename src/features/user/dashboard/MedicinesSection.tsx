import { DrugCard } from "~/components/cards/drugCard";
import { CustomDialog } from "~/components/CustomDialog";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { DrugModal } from "./DrugModal";
import { useState } from "react";

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

  const drugs = [
    {
      name: "Fentanyl",
      description:
        "Fentanyl -organiczny związek chemiczny, pochodna piperydyny; syntetyczny środek przeciwbólowy i anestezjologiczny, syntetyczny opioid. Jest agonistą receptorów opioidowych. Pobudza wytwarzanie serotoniny, zmniejsza stężenie endorfin w osoczu. Ma bezpośredni wpływ na ośrodkowy układ nerwowy.",
    },
    {
      name: "Paracetamol",
      description:
        "Paracetamol, acetaminofen – organiczny związek chemiczny, hydroksylowa pochodna acetanilidu, stosowany jako lek o działaniu przeciwbólowym i przeciwgorączkowym. W handlu znajduje się od 1955. W Polsce stał się popularny w latach 90.",
    },
  ];

  return (
    <div className="py-4">
      <SectionTitle>Medications</SectionTitle>
      <div className="grid place-items-center items-stretch gap-x-2 gap-y-3 lg:grid-cols-1 2xl:grid-cols-2">
        {drugs.map((drug, idx) => (
          <DrugCard
            key={idx}
            title={drug.name}
            onClick={() => openDrugModal(drug)}
          >
            <img
              className="w-full rounded-lg"
              src="/medicine-1.jpeg"
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
