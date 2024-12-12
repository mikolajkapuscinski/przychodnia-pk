import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { PatientBlock } from "./PatientBlock";

interface PatientSectionProps {}

export const PatientSection: React.FC<PatientSectionProps> = (
  p: PatientSectionProps,
) => {
  return (
    <div>
      <SectionTitle title={"My Patients"} results={1}></SectionTitle> <></>
      <PatientBlock
        name={"Boa Dusiciel"}
        onViewHistory={function (): void {
          throw new Error("Function not implemented.");
        }}
        pesel={"02322203534"}
        age={23}
        gender={"M"}
      />
    </div>
  );
};
