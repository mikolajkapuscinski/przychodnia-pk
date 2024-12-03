import React, { useState } from "react";
import { Button } from "~/components/forms/Button";
import { Line } from "~/components/forms/Line";
import { Select } from "~/components/forms/Select";
import { Title } from "~/components/forms/Title";


export const VisitSearch: React.FC = () => {
    const [selectedSpecialization, setSelectedSpecialization] = useState("");

    const handleSpecializationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSpecialization(e.target.value);
    };
    
    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-default-white rounded-2xl mt-20">
            <Title>Book an appointment</Title>
            <Line />
            <div className="flex items-center space-x-4 mt-5">
                <div className="flex-grow-[3]">
                <Select
                    id="visit-search"
                    name="visit-search"
                    value={selectedSpecialization}
                    onChange={handleSpecializationChange}
                    placeholder="Choose specjalization"
                    options={[
                        // TODO
                        {value: "SPECIALIZATION", label: "Specjalization"}
                    ]}
                />
                </div>
                <div className="flex-grow-[1]">
                    <Button>Search</Button>
                </div>
            </div>
            
        </div>
    );
};
