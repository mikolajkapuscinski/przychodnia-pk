import { Line } from "~/components/forms/Line";
import { AilmentCard } from "~/components/cards/ailmentCard";

interface SelectedAilmentProps {
  medicalHistory: any[];
  selectedRegion: string | null;
}

export const SelectedAilment: React.FC<SelectedAilmentProps> = ({
  medicalHistory,
  selectedRegion,
}) => {
  const safeMedicalHistory = Array.isArray(medicalHistory)
    ? medicalHistory
    : [];

  return (
    <div className="hidden xl:block">
      <div className="grid grid-cols-1 place-items-center items-stretch gap-x-2 gap-y-3">
        {safeMedicalHistory.length > 0 ? (
          safeMedicalHistory.map((ailment) => (
            <AilmentCard
              key={ailment.id}
              title={"Ailment for " + (selectedRegion || "")}
            >
              <span>
                <span className="text-gray-400">Diagnosis date:&nbsp;</span>
                <span className="font-semibold text-aquamarine">
                  {new Date(ailment.diagnosisDate).toLocaleDateString()}
                </span>
              </span>
              <Line />
              <p className="mb-1">MAIN DIAGNOSIS: </p>
              <p className="text-sm font-semibold">{ailment.diseaseName}</p>
            </AilmentCard>
          ))
        ) : (
          <AilmentCard
            key="no-history"
            title={`No ailments for ${selectedRegion || "unknown"}`}
          >
            {`There is no medical history for the ${
              selectedRegion || "unknown"
            } region.`}
          </AilmentCard>
        )}
      </div>
    </div>
  );
};
