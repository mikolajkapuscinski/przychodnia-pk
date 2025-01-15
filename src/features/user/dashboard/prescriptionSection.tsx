import { AilmentCard } from "~/components/cards/ailmentCard";
import { Card } from "~/components/cards/card";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { Line } from "~/components/forms/Line";
import { api } from "~/utils/api";

export const PrescriptionSection: React.FC = () => {
  const { data: patientPrescriptions } =
    api.user.getPatientPrescriptions.useQuery();

  return (
    <div className="px-12 py-4">
      <SectionTitle results={patientPrescriptions?.length}>
        Prescriptions
      </SectionTitle>

      {patientPrescriptions && patientPrescriptions.length > 0 ? (
        <div className="grid place-items-center items-stretch gap-x-2 gap-y-3 lg:grid-cols-1 2xl:grid-cols-2">
          {patientPrescriptions.map((p) => {
            const data = p.prescription
              ? JSON.parse(p.prescription as string)
              : null;
            if (!data) return null;

            return (
              <Card title={`Condition: ${data.patientCondition}`}>
                <Line className="my-1"></Line>
                <p>{`Recommendation: ${data.recommendations}`}</p>
                <p>{`Diagnosis: ${data.diagnosis}`}</p>
              </Card>
            );
          })}
        </div>
      ) : (
        <p>No prescriptions available.</p>
      )}
    </div>
  );
};
