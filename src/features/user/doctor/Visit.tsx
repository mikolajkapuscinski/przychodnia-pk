import React, { useState } from "react";
import { Title } from "~/components/forms/Title";
import { Button } from "~/components/forms/Button";
import { Search } from "~/components/forms/Search";
import { SearchDrugs } from "./SearchDrugs";
// Załóżmy, że Searchbar jest już zaimportowany

export const Visit: React.FC = () => {
  const [patientCondition, setPatientCondition] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [selectedMedicines, setSelectedMedicines] = useState<any[]>([]);

  const handleMedicineSelect = (medicine: any) => {
    setSelectedMedicines((prevMedicines) => [...prevMedicines, medicine]);
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-default-white p-6">
      <Title>Appointment</Title>
      <h4 className="text-center">11.11.2024 12:00</h4>

      <div className="mt-6 flex space-x-8">
        <div className="flex-1 space-y-4">
          {/* TODO */}
          <div>
            <h5 className="font-bold">Patient Information</h5>
            <p>Name: Mikołaj Donosiciel</p>
            <p>PESEL: 03164845622</p>
            <p>Email: mikolaj@kapus.com</p>
          </div>
          {/* TODO */}
          <div>
            <h5 className="font-bold">Allergies</h5>
            <p>VSCode, Peanuts</p>
          </div>

          <div>
            {/* TODO */}
            <Button variant="blue" size="base">
              View Medical History
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h5 className="font-bold">Doctor Information</h5>
            <p>Name: Dr. Michael Apple</p>
            <p>Specialization: Senior Developer</p>
            <p>Email: antonovka@cases.gg</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h5 className="font-bold">Patient's Condition</h5>
        <textarea
          value={patientCondition}
          onChange={(e) => setPatientCondition(e.target.value)}
          placeholder="Describe patient's condition..."
          className="w-full rounded-md border p-2"
        />
      </div>

      <div className="mt-4 flex space-x-4">
        <div className="form-group flex-grow-[1]">
          <h5 className="font-bold">Select Medicines</h5>
          <SearchDrugs onSelect={handleMedicineSelect} />
          <div className="mt-2">
            <h6 className="font-semibold">Selected Medicines:</h6>
            <ul>
              {selectedMedicines.map((medicine, index) => (
                <li key={index} className="text-sm">
                  {medicine.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="form-group flex-grow-[1]">
          <h5 className="font-bold">Recommendations</h5>
          <textarea
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            placeholder="Provide recommendations..."
            className="w-full rounded-md border p-2"
            rows={6}
          />
        </div>
      </div>

      <div className="mt-4">
        <h5 className="font-bold">Notes</h5>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes..."
          className="w-full rounded-md border p-2"
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
