import React from "react";
import { Search } from "~/components/forms/Search";
import { api } from "~/utils/api";

interface SearchDrugsProps {
  onSelect: (selectedMedicine: any) => void;
}

export const SearchDrugs: React.FC<SearchDrugsProps> = ({ onSelect }) => {
  const { data: allMedicines = [] } = api.drug.getAllDrugs.useQuery();

  return (
    <Search
      items={allMedicines}
      filterFunction={(medicine, query) =>
        medicine.name.toLowerCase().startsWith(query.toLowerCase())
      }
      onSelect={onSelect}
      placeholder="Search for a medicine..."
      id="search-drugs"
      name="search-drugs"
    />
  );
};
