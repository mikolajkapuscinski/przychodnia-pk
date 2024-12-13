import { DrugCard } from "~/components/cards/drugCard";
import { SectionTitle } from "~/components/dashboard/SectionTitle";

export const MedicinesSection: React.FC = () => {
  return (
    <div className="py-4">
      <SectionTitle>Medications</SectionTitle>
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
    </div>
  );
};
