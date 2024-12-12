import React from "react";
import { Button } from "~/components/forms/Button";

interface PatientBlockProps {
  name: string;
  pesel: string;
  age: number;
  gender: string;
  onViewHistory: () => void;
}

export const PatientBlock: React.FC<PatientBlockProps> = (
  p: PatientBlockProps,
) => {
  return (
    <div className="mx-0 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex-grow pr-4">
          <h3 className="text-base font-bold">{p.name}</h3>
          <div className="space-y-1 text-xs text-gray-600">
            <p>
              <span className="font-medium">PESEL:</span> {p.pesel}
            </p>
          </div>
        </div>
        <Button
          className="flex h-8 min-w-8 items-center justify-center"
          variant={"primary"}
          size={"xs"}
        >
          <img className="w-4 invert" src="/docs.png" alt="search" />
        </Button>
      </div>
    </div>
  );
};
