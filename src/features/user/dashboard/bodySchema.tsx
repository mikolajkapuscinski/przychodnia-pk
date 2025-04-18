import React from "react";
import { BodyRegion } from "./bodyRegion";
import { DiseaseRegion } from "@prisma/client";

interface BodySchemaProps {
  selectedRegion: string | null;
  medicalHistory?: any;
  onRegionClick: (region: string) => void;
}

export const BodySchema: React.FC<BodySchemaProps> = ({
  medicalHistory = [],
  onRegionClick,
}) => {
  return (
    <div className="w-1/3 justify-center xl:flex">
      <div
        style={{
          backgroundImage: "url(/human.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          aspectRatio: "1464 / 3156",
        }}
        className="relative h-[calc(100vh-4rem)]"
      >
        {Object.keys(DiseaseRegion).map((regionKey) => {
          const region = regionKey as DiseaseRegion;
          const regionHistory = medicalHistory.find(
            (history: { region: DiseaseRegion }) => history.region === region,
          );

          return (
            <BodyRegion
              key={region}
              region={region}
              onClick={onRegionClick}
              medicalHistory={regionHistory}
            />
          );
        })}
      </div>
    </div>
  );
};
