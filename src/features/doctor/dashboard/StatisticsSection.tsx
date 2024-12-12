import { SectionTitle } from "~/components/dashboard/SectionTitle";

interface StatisticsSectionProps {}

export const StatisticsSection: React.FC<StatisticsSectionProps> = (
  p: StatisticsSectionProps,
) => {
  return <SectionTitle title={"Statistics"}></SectionTitle>;
};
