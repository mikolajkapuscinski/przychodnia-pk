import React from "react";
import { BodyRegion } from "./bodyRegion";

interface BodySchemaProps {
  selectedRegion: string | null;
  onRegionClick: (region: string) => void;
}

export const BodySchema: React.FC<BodySchemaProps> = ({
  selectedRegion,
  onRegionClick,
}) => {
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
        <BodyRegion region="HEAD" onClick={onRegionClick} />
        <BodyRegion region="CHEST" onClick={onRegionClick} />
        <BodyRegion region="LEFT_LEG" onClick={onRegionClick} />
        <BodyRegion region="LEFT_ARM" onClick={onRegionClick} />
        <BodyRegion region="RIGHT_LEG" onClick={onRegionClick} />
        <BodyRegion region="RIGHT_ARM" onClick={onRegionClick} />
        <BodyRegion region="THROAT" onClick={onRegionClick} />
      </div>
    </div>
  );
};
