import { InfoSection } from "./infoSection";
import { MedicinesSection } from "./MedicinesSection";
import { SelectedAilment } from "./selectedAilment";
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
    <div className="w-1/3 px-12 py-4">
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
      </div>
      <MedicinesSection />
      <InfoSection />
    </div>
  );
};
