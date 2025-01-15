import React, { useState, useEffect } from "react";
import { Title } from "~/components/forms/Title";
import { Button } from "~/components/forms/Button";
import { SearchDrugs } from "./SearchDrugs";
import { TextArea } from "~/components/forms/TextArea";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Select } from "~/components/forms/Select";
import { DiseaseRegion } from "@prisma/client";

const diseaseRegionOptions = Object.keys(DiseaseRegion).map((key) => ({
  value: key,
  label: DiseaseRegion[key as keyof typeof DiseaseRegion],
}));

interface VisitProps {
  id: number;
  title: string;
  date: string;
  allergies: { id: number; name: string }[];
  patient: any;
  prescription?: string;
  closeDialog: () => void;
}

export const Visit: React.FC<VisitProps> = (p) => {
  const { data: session } = useSession();

  const [patientCondition, setPatientCondition] = useState<string>("");
  const [recommendations, setRecommendations] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [selectedMedicines, setSelectedMedicines] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<DiseaseRegion>();

  const finishVisitMutation = api.visit.finishVisit.useMutation();
  const addMedicalHistoryMutation =
    api.medicalHistory.addMedicalHistory.useMutation();

  const handleMedicineSelect = (medicine: any) => {
    if (selectedMedicines.some((m) => m.id === medicine.id)) {
      return;
    }
    setSelectedMedicines((prevMedicines) => [...prevMedicines, medicine]);
  };

  const handleMedicineRemove = (medicineId: number) => {
    setSelectedMedicines((prevMedicines) =>
      prevMedicines.filter((medicine) => medicine.id !== medicineId),
    );
  };

  const finishAppointment = () => {
    const prescription = JSON.stringify({
      patientCondition,
      recommendations,
      diagnosis,
    });

    const drugIds = selectedMedicines.map((medicine) => medicine.id);

    finishVisitMutation.mutate({
      id: p.id,
      prescription: prescription,
      drugIds,
    });

    addMedicalHistoryMutation.mutate({
      patientId: p.patient.id,
      diseaseName: diagnosis,
      diagnosisDate: new Date(),
      region: selectedRegion || DiseaseRegion.CHEST,
    });

    p.closeDialog();
  };

  useEffect(() => {
    if (p.prescription) {
      const prescriptionData = JSON.parse(p.prescription);

      setPatientCondition(prescriptionData.patientCondition || "");
      setRecommendations(prescriptionData.recommendations || "");
      setDiagnosis(prescriptionData.diagnosis || "");
    }
  }, [p.prescription]);

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
                {p.allergies.map((allergy) => (
                  <li key={allergy.id} className="text-base text-default-black">
                    {allergy.name}
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

        <div className="flex flex-1 flex-col justify-between space-y-4">
          <div>
            <h5 className="font-bold">Doctor Information</h5>
            <p>Name: Dr. {session?.user.name}</p>
            <p>Email: {session?.user.email}</p>
          </div>
          <div>
            <h5 className="font-bold">Region</h5>
            <Select
              id={"region"}
              name={"region"}
              value={selectedRegion || ""}
              placeholder="Select region..."
              options={diseaseRegionOptions}
              onChange={(e) =>
                setSelectedRegion(e.target.value as DiseaseRegion)
              }
            ></Select>
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
              {selectedMedicines.map((medicine) => (
                <li
                  key={medicine.id}
                  className="flex items-center justify-between text-base"
                >
                  <span>{medicine.name}</span>
                  <Button
                    onClick={() => handleMedicineRemove(medicine.id)}
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
        <h5 className="font-bold">Diagnosis</h5>
        <TextArea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Enter diagnosis..."
        />
      </div>

      <div className="mt-6 text-center">
        <Button variant="primary" size="base" onClick={finishAppointment}>
          Finish Appointment
        </Button>
      </div>
    </div>
  );
};
