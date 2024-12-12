import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { InfoCard } from "~/components/cards/infoCard";

export const InfoSection: React.FC = () => {
  return (
    <div className="">
      <SectionTitle>Informations</SectionTitle>
      <div className="grid grid-cols-1 gap-y-2">
        <InfoCard>the appointment date is approaching</InfoCard>
        <InfoCard>the appointment date is approaching</InfoCard>
      </div>
    </div>
  );
};
