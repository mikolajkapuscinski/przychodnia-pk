import { Card } from "~/components/cards/card";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { Line } from "~/components/forms/Line";
import { api } from "~/utils/api";

export const PrescriptionSection: React.FC = () => {
  const { data: patientPresctiptions } =
    api.user.getPatientPrescriptions.useQuery();

  return (
    <div className="px-12 py-4">
      <SectionTitle results={patientPresctiptions?.length}>
        Prescriptions
      </SectionTitle>
      <div className="grid place-items-center items-stretch gap-x-2 gap-y-3 lg:grid-cols-1 2xl:grid-cols-2">
        {patientPresctiptions &&
          patientPresctiptions.map((prescription) => (
            <Card title="Clean backdoor">
              <Line className="my-1"></Line>
              {/* {prescription} */}
            </Card>
          ))}
      </div>
    </div>
  );
};
