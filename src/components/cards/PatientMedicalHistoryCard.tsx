import React from "react";
import { Button } from "../forms/Button";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface PatientMedicalHistoryProps {
  medicalHistory: {
    id: number;
    date: string | Date;
    diseaseName: string;
    recoveryDate?: string | Date;
  }[];
  closeDialog: () => void; 
}

const PatientMedicalHistory: React.FC<PatientMedicalHistoryProps> = (p) => {
  const closeTreatmentMutation = api.medicalHistory.closeTreatment.useMutation({
    onSuccess: async () => {
      console.log("Treatment closed in database!");
    },
  });

  const router = useRouter();
  const { data: sessionData } = useSession();

  const handleCloseTreatment = async (id: number) => {
    try {
      await closeTreatmentMutation.mutateAsync({ id });

      p.closeDialog();

      await router.push(`/${sessionData?.user?.role?.toLowerCase()}/dashboard`);
    } catch (error) {
      console.error("Error closing treatment:", error);
    }
  };

  return (
    <div className="rounded-2xl border border-default-gray p-5">
      <h2 className="text-lg font-bold">Medical History</h2>
      {p.medicalHistory.length > 0 ? (
        <div>
          <ul>
            {p.medicalHistory.map((entry, index) => (
              <li
                key={index}
                className="mb-4 flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div>
                  <p className="font-bold">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p>{entry.diseaseName}</p>
                </div>
                {!entry.recoveryDate && (
                  <div className="ml-4">
                    <Button
                      variant="primary"
                      size="base"
                      className="w-auto px-4 py-2"
                      onClick={() => handleCloseTreatment(entry.id)}
                    >
                      Close treatment
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No medical history available.</p>
      )}
    </div>
  );
};

export default PatientMedicalHistory;
