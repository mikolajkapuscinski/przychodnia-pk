import { PrescriptionSection } from "~/features/user/dashboard/prescriptionSection";
import { VisitSection } from "~/features/user/dashboard/visitSection";

export const LeftSection: React.FC = () => {
  return (
    <div className="col-span-1 max-h-[calc(100vh-4rem)]">
      <PrescriptionSection></PrescriptionSection>
      <VisitSection></VisitSection>
    </div>
  );
};
