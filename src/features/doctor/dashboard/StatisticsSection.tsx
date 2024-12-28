import { SectionTitle } from "~/components/dashboard/SectionTitle";
import StatisticsCard from "./StatisticsCard";

type StatisticsSectionProps = unknown;

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
