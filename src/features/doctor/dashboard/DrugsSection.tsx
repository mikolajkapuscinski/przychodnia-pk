import { SectionTitle } from "~/components/dashboard/SectionTitle";

interface DrugsSectionProps {}

export const DrugsSection: React.FC<DrugsSectionProps> = (
  p: DrugsSectionProps,
) => {
  return <SectionTitle title={"Drugs"} results={1}></SectionTitle>;
};
