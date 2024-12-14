import React from "react";
import { Button } from "~/components/forms/Button";

interface PatientBlockProps {
  firstName: string;
  lastName: string;
  pesel: string;
  onViewHistory?: () => void;
  className?: string;
}

export const PatientBlock: React.FC<PatientBlockProps> = (
  p: PatientBlockProps,
) => {
  return (
    <div
      className={`mx-0 w-full overflow-hidden rounded-2xl bg-default-white shadow-md ${p.className}`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex-grow pr-4">
          <h3 className="text-base font-bold">
            {p.firstName} {p.lastName}
          </h3>
          <div className="space-y-1 text-xs text-gray-600">
            <p>
              <span className="font-medium">PESEL:</span> {p.pesel}
            </p>
          </div>
        </div>
        {p.onViewHistory ? (
          <Button
            className="flex h-8 min-w-8 items-center justify-center"
            variant={"primary"}
            size={"xs"}
            onClick={p.onViewHistory}
          >
            <img className="w-4 invert" src="/docs.png" alt="search" />
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
