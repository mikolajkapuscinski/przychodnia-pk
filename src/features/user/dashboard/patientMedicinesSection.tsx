import { DrugCard } from "~/components/cards/drugCard";
import { SectionTitle } from "~/components/dashboard/SectionTitle";

export const PatientMedicinesSection: React.FC = () => {
  return (
    <div className="px-12 py-4">
      <SectionTitle results={21}>Your Medicines</SectionTitle>
      <div className="grid place-items-center items-stretch gap-x-2 gap-y-3 lg:grid-cols-1 2xl:grid-cols-2">
        <DrugCard title="Paracetamol"></DrugCard>
        <DrugCard title="Fentanyl"></DrugCard>
        <DrugCard title="Rutinoscorbin"></DrugCard>
      </div>
    </div>
  );
};
