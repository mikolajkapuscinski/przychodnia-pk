import { Card } from "~/components/card";
import { VisitCard } from "~/components/visitCard";

export const SelectedAilment: React.FC = () => {
  return (
    <div className="hidden px-12 py-4 xl:block">
      <div className="mb-4 flex items-center">
        <h2 className="mx-3 text-2xl font-bold">Selected ailment</h2>
      </div>
      <div className="grid grid-cols-1 place-items-center items-stretch gap-x-2 gap-y-3">
        <VisitCard isSoon={true} title="Broken leg">
          You broke your leg falling from the plane 2 months ago.
        </VisitCard>
        <Card title="Doctor in charge">Micheal Apple</Card>
      </div>
    </div>
  );
};
