import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { DatePicker } from "~/features/user/create-visit/DatePicker";

interface VisitsSectionProps {}

export const VisitsSection: React.FC<VisitsSectionProps> = (
  p: VisitsSectionProps,
) => {
  return (
    <>
      <SectionTitle title={"My Visits"} results={1}></SectionTitle>
    </>
  );
};
