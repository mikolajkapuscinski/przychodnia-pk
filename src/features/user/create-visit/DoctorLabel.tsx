import React from "react";
import { type Specialization } from "@prisma/client";

export interface DoctorLabelProps {
  firstName: string;
  lastName: string;
  specialization?: Specialization[];
  opinion?: {
    id: number;
    patientId: String;
    doctorId: String;
    opinionText?: String;
    rating: number;
    count: number;
  };
}

export const DoctorLabel = (p: DoctorLabelProps) => {
  return (
    <div className="flex">
      <img
        className="max-h-20 max-w-20 rounded-full object-cover"
        src="/doctor.png"
        alt=""
      />
      <div className="ml-4 rounded-xl bg-default-white">
        <h3 className="text-lg font-semibold text-default-black">
          {p.firstName} {p.lastName}
        </h3>
        {p.specialization ? (
          <p className="text-sm text-gray-500">
            {p.specialization
              .slice(0, 3)
              .map((s) => s.name)
              .join(", ")}
          </p>
        ) : (
          <></>
        )}
        {p.opinion ? (
          <p className="font-small text-sm text-aquamarine">
            <span className="font-bold">
              {p.opinion.rating.toPrecision(2)}/5{" "}
            </span>
            ({p.opinion.count}{" "}
            <span>{p.opinion.count == 1 ? "opinion" : "opinions"})</span>
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
