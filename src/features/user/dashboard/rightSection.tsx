import { InfoSection } from "./infoSection";
import { PatientMedicinesSection } from "./patientMedicinesSection";
import { SelectedAilment } from "./selectedAilment";

export const RightSection: React.FC = () => {
  return (
    <div className="w-1/3">
      <SelectedAilment></SelectedAilment>
      <PatientMedicinesSection></PatientMedicinesSection>
      <InfoSection></InfoSection>
    </div>
  );
};
