import { Card } from "~/components/card";

export const PatientMedicinesSection: React.FC = () => {
  return (
    <div className="px-12 py-4">
      <div className="mb-4 flex items-center">
        <h2 className="mx-3 text-2xl font-bold">Your Medicines</h2>
        <a className="cursor-pointer text-xs text-aquamarine underline">
          see all
        </a>
      </div>
      <div className="grid place-items-center items-stretch gap-x-2 gap-y-3 lg:grid-cols-1 2xl:grid-cols-2">
        <Card title="Paracetamol"></Card>
        <Card title="Fentanyl"></Card>
        <Card title="Rutinoscorbin"></Card>
      </div>
    </div>
  );
};
