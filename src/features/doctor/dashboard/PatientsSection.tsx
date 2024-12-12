import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { PatientBlock } from "./PatientBlock";

interface PatientSectionProps {}

export const PatientSection: React.FC<PatientSectionProps> = (
  p: PatientSectionProps,
) => {
  return (
    <div>
      <SectionTitle results={1}>My Patients</SectionTitle>
      <div className="flex flex-col gap-y-2">
        <PatientBlock
          name={"Boa Dusiciel"}
          onViewHistory={function (): void {
            throw new Error("Function not implemented.");
          }}
          pesel={"02322203534"}
        />
        <PatientBlock
          name={"Bożydar Kleks"}
          onViewHistory={function (): void {
            throw new Error("Function not implemented.");
          }}
          pesel={"95884654231"}
        />
        <PatientBlock
          name={"Julian Tuwim"}
          onViewHistory={function (): void {
            throw new Error("Function not implemented.");
          }}
          pesel={"12356489877"}
        />
      </div>
    </div>
  );
};
