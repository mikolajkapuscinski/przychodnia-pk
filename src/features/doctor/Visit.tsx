import React, { useState } from "react";
import { Title } from "~/components/forms/Title";
import { Button } from "~/components/forms/Button";
import { SearchDrugs } from "./SearchDrugs";
import { TextArea } from "~/components/forms/TextArea";
import { useSession } from "next-auth/react";

interface VisitProps {
  title: string;
  date: string;
  allergies: string[];
  patient: any;
}

export const Visit: React.FC<VisitProps> = (p) => {
  const { data: session } = useSession();

  const [patientCondition, setPatientCondition] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [selectedMedicines, setSelectedMedicines] = useState<any[]>([]);

  const handleMedicineSelect = (medicine: any) => {
    if (selectedMedicines.some((m) => m.name === medicine.name)) {
      return;
    }
    setSelectedMedicines((prevMedicines) => [...prevMedicines, medicine]);
  };

  const handleMedicineRemove = (medicineName: string) => {
    setSelectedMedicines((prevMedicines) =>
      prevMedicines.filter((medicine) => medicine.name !== medicineName),
    );
  };

  return (
    <div className="mx-auto min-w-48 rounded-2xl bg-default-white p-6">
      <Title>{p.title}</Title>
      <h4 className="text-center">{p.date}</h4>

      <div className="mt-6 flex space-x-8">
        <div className="flex-1 space-y-4">
          <div>
            <h5 className="font-bold">Patient Information</h5>
            <p>
              Name: {p.patient.firstName} {p.patient.lastName}
            </p>
            <p>PESEL: {p.patient.pesel}</p>
            <p>Email: {p.patient.email}</p>
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

          <div>
            <Button variant="blue" size="base">
              View Medical History
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h5 className="font-bold">Doctor Information</h5>
            <p>Name: Dr. {session?.user.name}</p>
            <p>Email: {session?.user.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h5 className="font-bold">Patient&apos;s Condition</h5>
        <TextArea
          value={patientCondition}
          onChange={(e) => setPatientCondition(e.target.value)}
          placeholder="Describe patient's condition..."
        />
      </div>

      <div className="mt-4 flex space-x-4">
        <div className="form-group flex-grow-[1]">
          <h5 className="font-bold">Select Medicines</h5>
          <SearchDrugs onSelect={handleMedicineSelect} />
          <div className="mt-2">
            <ul>
              {selectedMedicines.map((medicine, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-base"
                >
                  <span>{medicine.name}</span>
                  <Button
                    onClick={() => handleMedicineRemove(medicine.name)}
                    variant={"minimalistic"}
                    size={"xs"}
                  >
                    ✕
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="form-group flex-grow-[1]">
          <h5 className="font-bold">Recommendations</h5>
          <TextArea
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            placeholder="Provide recommendations..."
            rows={6}
          />
        </div>
      </div>

      <div className="mt-4">
        <h5 className="font-bold">Notes</h5>
        <TextArea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes..."
        />
      </div>

      <div className="mt-6 text-center">
        <Button variant="primary" size="base">
          Finish Appointment
        </Button>
      </div>
    </div>
  );
};
