import { type DiseaseRegion } from "@prisma/client";
import { assert } from "~/utils/assert";

const REGION_OFFSETS: Record<
  DiseaseRegion,
  { top: `${string}%`; left: `${string}%` }
> = {
  HEAD: { top: "3%", left: "50%" },
  CHEST: { top: "24%", left: "50%" },
  LEFT_ARM: { top: "35%", left: "20%" },
  RIGHT_LEG: { top: "60%", left: "63%" },
  RIGHT_ARM: { top: "35%", left: "80%" },
  LEFT_LEG: { top: "60%", left: "37%" },
  THROAT: { top: "12%", left: "50%" },
};

export interface BodyRegionProps {
  region: DiseaseRegion;
  onClick: (region: string) => void;
}

export const BodyRegion: React.FC<BodyRegionProps> = ({ region, onClick }) => {
  assert(region in REGION_OFFSETS);
  const offsets = REGION_OFFSETS[region];

  return (
    <div
      className={`absolute h-5 w-5 cursor-pointer rounded-full border border-black bg-orange`}
      style={{
        top: `calc(${offsets.top} - 2px)`,
        left: `calc(${offsets.left} - 2px)`,
      }}
      onClick={() => {
        onClick(region);
      }}
    >
      {" "}
    </div>
  );
};
