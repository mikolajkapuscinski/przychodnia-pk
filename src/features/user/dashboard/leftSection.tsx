import { PrescriptionSection } from "~/features/user/dashboard/prescriptionSection";
import { VisitSection } from "~/features/user/dashboard/visitSection";

export const LeftSection: React.FC = () => {
  return (
    <div className="max-h-[calc(100vh-4rem)] w-1/3">
      <PrescriptionSection></PrescriptionSection>
      <VisitSection></VisitSection>
    </div>
  );
};
