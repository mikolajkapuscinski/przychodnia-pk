import { Card } from "~/components/cards/card";
import { SectionTitle } from "~/components/dashboard/SectionTitle";

export const PrescriptionSection: React.FC = () => {
  return (
    <div className="px-12 py-4">
      <SectionTitle results={2137}>Prescriptions</SectionTitle>
      <div className="grid place-items-center items-stretch gap-x-2 gap-y-3 lg:grid-cols-1 2xl:grid-cols-2">
        <Card title="Clean backdoor">
          Doctor recommend to clean your butt. It might be source of infection.
        </Card>
        <Card title="Take marsians">
          Mastians will support your immune system
        </Card>
        <Card title="Fentanyl vacc">For pain relief and good fun</Card>
        <Card title="More moving">Good for everyone</Card>
      </div>
    </div>
  );
};
