import { Card } from "~/components/cards/card";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { VisitCard } from "~/components/cards/visitCard";

export const SelectedAilment: React.FC = () => {
  return (
    <div className="hidden px-12 py-4 xl:block">
      <SectionTitle>Selected Ailment</SectionTitle>
      <div className="grid grid-cols-1 place-items-center items-stretch gap-x-2 gap-y-3">
        <VisitCard isSoon={true} title="Broken leg">
          You broke your leg falling from the plane 2 months ago.
        </VisitCard>
        <Card title="Doctor in charge">Micheal Apple</Card>
      </div>
    </div>
  );
};
