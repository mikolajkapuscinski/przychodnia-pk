import React from "react";
import { Title } from "~/components/forms/Title";

interface VisitReadOnlyProps {
  title: string;
  date: string;
  firstName: string;
  lastName: string;
  pesel: string;
  email: string;
  createdAt: string;
  allergies: string[];
  medicines: string[];

  doctorFirstName: string;
  doctorLastName: string;
  doctorSpecializations: string[];
  doctorEmail: string;
}

export const VisitReadOnly: React.FC<VisitReadOnlyProps> = (p) => {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-default-white p-6">
      <Title>{p.title}</Title>
      <h4 className="text-center">{p.date}</h4>

      <div className="mt-6 flex space-x-8">
        <div className="flex-1 space-y-4">
          <div>
            <h5 className="font-bold">Patient Information</h5>
            <p>
              Name: {p.firstName} {p.lastName}
            </p>
            <p>PESEL: {p.pesel}</p>
            <p>Email: {p.email}</p>
          </div>
          <div>
            <h5 className="font-bold">Allergies</h5>
            {p.allergies.length > 0 ? (
              <ul className="list-disc pl-5">
                {p.allergies.map((allergy, index) => (
                  <li key={index} className="text-base text-default-black">
                    {allergy}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No allergies recorded.</p>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h5 className="font-bold">Doctor Information</h5>
            <p>
              Name: {p.doctorFirstName} {p.doctorLastName}
            </p>
            {p.doctorSpecializations.length > 0 ? (
              <ul className="list-disc pl-5">
                {p.doctorSpecializations.map((spec, index) => (
                  <li key={index} className="text-base text-default-black">
                    {spec}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No specializations recorded.</p>
            )}
            <p>Email: {p.doctorEmail}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h5 className="font-bold">Patient's Condition</h5>
      </div>

      <div className="mt-4 flex space-x-4">
        <div className="form-group flex-grow-[1]">
          <h5 className="font-bold">Selected Medicines</h5>
          {p.medicines.length > 0 ? (
            <ul className="list-disc pl-5">
              {p.medicines.map((medicine, index) => (
                <li key={index} className="text-base text-default-black">
                  {medicine}
                </li>
              ))}
            </ul>
          ) : (
            <p>No medicines recorded.</p>
          )}
        </div>

        <div className="form-group flex-grow-[1]">
          <h5 className="font-bold">Recommendations</h5>
        </div>
      </div>

      <div className="mt-4">
        <h5 className="font-bold">Notes</h5>
      </div>
    </div>
  );
};
