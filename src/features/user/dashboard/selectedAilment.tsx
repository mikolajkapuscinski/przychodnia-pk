import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { AilmentCard } from "~/components/cards/ailmentCard";

export const SelectedAilment: React.FC = () => {
  return (
    <div className="hidden xl:block">
      <SectionTitle>Selected Ailment</SectionTitle>
      <div className="grid grid-cols-1 place-items-center items-stretch gap-x-2 gap-y-3">
        <AilmentCard title="Broken leg" firstName={"Dariusz Dorota"} lastName={""} specialization={[{ id: "1", name: "embedded developer" }]} opinion={{ rating: 0, count: 0 }}>
          You broke your leg falling from the plane 2 months ago.
        </AilmentCard>
      </div>
    </div>
  );
};
