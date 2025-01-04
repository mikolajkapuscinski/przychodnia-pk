import React, { useState, useEffect } from "react";
import { SectionTitle } from "~/components/dashboard/SectionTitle";
import { Button } from "~/components/forms/Button";
import { api } from "~/utils/api";

interface Medication {
  id: number;
  name: string;
  description: string;
}

export const MedicationDatabase: React.FC = () => {
  const { data: medicines = [] } = api.drug.getAllDrugs.useQuery();
  const [displayedMedicines, setDisplayedMedicines] = useState<Medication[]>(
    [],
  );

  const loadMore = () => {
    const currentLength = displayedMedicines.length;
    setDisplayedMedicines([
      ...displayedMedicines,
      ...medicines.slice(currentLength, currentLength + 100),
    ]);
  };

  useEffect(() => {
    if (medicines.length > 0) {
      setDisplayedMedicines(medicines.slice(0, 100));
    }
  }, [medicines]);

  return (
    <div className="overflow-hidden rounded-lg bg-default-white">
      <SectionTitle>Medication Database</SectionTitle>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="select-none bg-light-aquamarine text-default-white">
              <tr>
                <th className="px-4 py-2 text-sm font-semibold">ID</th>
                <th className="px-4 py-2 text-sm font-semibold">Name</th>
                <th className="px-4 py-2 text-sm font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {displayedMedicines.map((medication) => (
                <tr
                  key={medication.id}
                  className="border-b border-default-gray"
                >
                  <td className="px-4 py-2 text-sm">{medication.id}</td>
                  <td className="px-4 py-2 text-sm">{medication.name}</td>
                  <td className="px-4 py-2 text-sm">
                    {medication.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Button onClick={loadMore} variant="blue" size="base">
        Load More
      </Button>
    </div>
  );
};
