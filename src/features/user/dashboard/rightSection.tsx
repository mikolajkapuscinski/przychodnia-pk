import { InfoSection } from "./infoSection";
import { MedicinesSection } from "./MedicinesSection";
import { SelectedAilment } from "./selectedAilment";

export const RightSection: React.FC = () => {
  return (
    <div className="w-1/3 px-12 py-4">
      <SelectedAilment></SelectedAilment>
      <MedicinesSection></MedicinesSection>
      <InfoSection></InfoSection>
    </div>
  );
};
