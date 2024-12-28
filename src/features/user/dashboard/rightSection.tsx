import { InfoSection } from "./infoSection";
import { MedicinesSection } from "./MedicinesSection";
import { SelectedAilment } from "./selectedAilment";

export const RightSection: React.FC = () => {
  return (
    <div className="col-span-1 px-12 py-4">
      <SelectedAilment></SelectedAilment>
      <MedicinesSection></MedicinesSection>
      <InfoSection></InfoSection>
    </div>
  );
};
