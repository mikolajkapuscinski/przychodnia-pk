import { SectionTitle } from "~/components/dashboard/SectionTitle";
import StatisticsCard from "./StatisticsCard";

interface StatisticsSectionProps {}

export const StatisticsSection: React.FC<StatisticsSectionProps> = (
  p: StatisticsSectionProps,
) => {
  return (
    <div>
      <SectionTitle>Statistics</SectionTitle>
      <StatisticsCard></StatisticsCard>
    </div>
  );
};
