import { InfoCard } from "~/components/infoCard";

export const InfoSection: React.FC = () => {
  return (
    <div className="px-12 py-4">
      <div className="mb-4 flex items-center">
        <h2 className="mx-3 text-2xl font-bold">Informations</h2>
      </div>
      <div className="grid grid-cols-1 gap-y-2">
        <InfoCard>the appointment date is approaching</InfoCard>
        <InfoCard>the appointment date is approaching</InfoCard>
      </div>
    </div>
  );
};
