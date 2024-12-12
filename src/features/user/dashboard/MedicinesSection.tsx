import { Card } from "~/components/card";
import { SectionTitle } from "~/components/dashboard/SectionTitle";

export const MedicinesSection: React.FC = () => {
  return (
    <div className="py-4">
      <SectionTitle>Medications</SectionTitle>
      <div className="grid place-items-center items-stretch gap-x-2 gap-y-3 lg:grid-cols-1 2xl:grid-cols-2">
        <Card title="Paracetamol"></Card>
        <Card title="Fentanyl"></Card>
        <Card title="Rutinoscorbin"></Card>
      </div>
    </div>
  );
};
