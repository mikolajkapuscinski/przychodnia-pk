import { Line } from "~/components/forms/Line";
import { AilmentCard } from "~/components/cards/ailmentCard";
import { Card } from "~/components/cards/card";
import { DoctorLabel } from "../create-visit/DoctorLabel";
import { api } from "~/utils/api";

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
          safeMedicalHistory.slice(0,2).map((ailment) => {
            const { data: doctorInCharge, isLoading } =
              api.user.findById.useQuery(ailment.doctorId);

            return (
              <>
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
                {!isLoading && doctorInCharge ? (
                  <Card title="Doctor in charge">
                    <Line />
                    <DoctorLabel
                      firstName={doctorInCharge.firstName || ""}
                      lastName={doctorInCharge.lastName || ""}
                    />
                  </Card>
                ) : (
                  <></>
                )}
              </>
            );
          })
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
