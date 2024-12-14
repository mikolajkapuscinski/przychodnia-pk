import React, { useState } from "react";
import { SectionTitle } from "~/components/dashboard/SectionTitle";

interface Medication {
  id: number;
  name: string;
  description: string;
}

interface MedicationDatabaseProps {
  medicines: Medication[];
}

export const MedicationDatabase: React.FC<MedicationDatabaseProps> = ({
  medicines,
}) => {
  const [sortedMedicines, setSortedMedicines] =
    useState<Medication[]>(medicines);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortMedicines = (column: keyof Medication) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedData = [...medicines].sort((a, b) => {
      if (a[column] < b[column]) return newSortOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newSortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setSortedMedicines(sortedData);
  };

  return (
    <div className="overflow-hidden rounded-lg bg-default-white">
      <SectionTitle>Medication Database</SectionTitle>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full table-auto">
          <thead className="select-none bg-light-aquamarine text-default-white">
            <tr>
              <th
                onClick={() => sortMedicines("id")}
                className="cursor-pointer rounded-tl-lg px-4 py-2 text-sm font-semibold hover:bg-[#b6d9e1]"
              >
                ID
              </th>
              <th
                onClick={() => sortMedicines("name")}
                className="cursor-pointer px-4 py-2 text-sm font-semibold hover:bg-[#b6d9e1]"
              >
                Name
              </th>
              <th
                onClick={() => sortMedicines("description")}
                className="cursor-pointer rounded-tr-lg px-4 py-2 text-sm font-semibold hover:bg-[#b6d9e1]"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMedicines.map((medication, index) => (
              <tr key={medication.id} className="border-b border-default-gray">
                <td className="px-4 py-2 text-sm">{medication.id}</td>
                <td className="px-4 py-2 text-sm">{medication.name}</td>
                <td className="px-4 py-2 text-sm">{medication.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
