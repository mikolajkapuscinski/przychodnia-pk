import { api } from "~/utils/api";
import { BodyRegion } from "./bodyRegion";

export const BodySchema: React.FC = () => {
  const medicalHistory =
    api.medicalHistory.getMyMedicalHistory.useQuery().data ?? [];

  return (
    <div className="col-span-1 flex justify-center">
      <div
        style={{
          backgroundImage: "url(/human.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          aspectRatio: "1464 / 3156",
        }}
        className="relative"
      >
        <BodyRegion region="HEAD"></BodyRegion>
        <BodyRegion region="CHEST"></BodyRegion>
        <BodyRegion region="LEFT_LEG"></BodyRegion>
        <BodyRegion region="LEFT_ARM"></BodyRegion>
        <BodyRegion region="RIGHT_LEG"></BodyRegion>
        <BodyRegion region="RIGHT_ARM"></BodyRegion>
        <BodyRegion region="THROAT"></BodyRegion>

        {medicalHistory.map((history) => (
          <BodyRegion key={history.id} {...history} />
        ))}
      </div>
    </div>
  );
};
