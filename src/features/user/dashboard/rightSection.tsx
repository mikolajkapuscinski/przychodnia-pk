import { Card } from "~/components/cards/card";
import { InfoSection } from "./infoSection";
import { MedicinesSection } from "./MedicinesSection";
import { SelectedAilment } from "./selectedAilment";
import { DoctorLabel } from "../create-visit/DoctorLabel";
import { Line } from "~/components/forms/Line";
import { AilmentCard } from "~/components/cards/ailmentCard";
import { SectionTitle } from "~/components/dashboard/SectionTitle";

interface RightSectionProps {
  selectedRegion: string | null;
  filteredHistory: any[];
}

export const RightSection: React.FC<RightSectionProps> = ({
  selectedRegion,
  filteredHistory,
}) => {
  return (
    <div className="col-span-1 px-12 py-4">
      <div className="space-y-3">
        <SectionTitle>Selected Ailment</SectionTitle>

        {selectedRegion ? (
          <SelectedAilment
            medicalHistory={filteredHistory}
            selectedRegion={selectedRegion}
          />
        ) : (
          <AilmentCard key="no-region" title="No region selected">
            Please click a region on the body to see the medical history for
            that body part.
          </AilmentCard>
        )}

        <Card title="Doctor in charge">
          <Line />
          <DoctorLabel
            firstName="Carlos"
            lastName="Vojtíla"
            specialization={[
              { id: "1", name: "Cardiochirurgy" },
              { id: "2", name: "Cardiology" },
            ]}
            opinion={{ rating: 0, count: 0 }}
          />
        </Card>
      </div>
      <MedicinesSection />
      <InfoSection />
    </div>
  );
};
