import { Card } from "~/components/card";

export const PrescriptionSection: React.FC = () => {
  return (
    <div className="px-12 py-4">
      <div className="mb-4 flex items-center">
        <h2 className="mx-3 text-2xl font-bold">Prescriptions</h2>
        <a className="cursor-pointer text-xs text-aquamarine underline">
          see all
        </a>
      </div>
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
