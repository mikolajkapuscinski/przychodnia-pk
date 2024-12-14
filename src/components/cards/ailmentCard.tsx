import { Line } from "../forms/Line";
import { Card, type CardProps } from "./card";
import {
  DoctorLabel,
  type DoctorLabelProps,
} from "~/features/user/create-visit/DoctorLabel";

type AilmentCardProps = DoctorLabelProps & CardProps;

export const AilmentCard: React.FC<AilmentCardProps> = (
  p: AilmentCardProps,
) => {
  return (
    <Card className={` ${p.className}`} title={p.title}>
      <div className="text-light-brown">
        {`Day of diagnosis: ${new Date().toLocaleDateString()}`}
      </div>
      {p.children}
      <Line></Line>
      <h2 className="text-lg font-semibold text-light-aquamarine">
        Doctor in charge:
      </h2>
      <DoctorLabel
        firstName={p.firstName}
        lastName=""
        specialization={p.specialization}
        opinion={p.opinion}
      ></DoctorLabel>
    </Card>
  );
};
