import { list } from "postcss";
import React, { useState } from "react";
import { Specialization } from "@prisma/client";


interface DoctorLabelProps {
    firstName: string;
    lastName: string;
    specialization: Specialization[];
    opinion: string;
}

export const DoctorLabel = (p: DoctorLabelProps) => {

    return (
        <div className="p-4 bg-default-white rounded-xl">
            <h3 className="text-lg font-semibold text-default-black">
                {p.firstName} {p.lastName}
            </h3>
            <p className="text-sm text-gray-500">
                {p.specialization.map((s) => s.name).join(", ")}
            </p>
            <p className="text-sm text-aquamarine font-small mt-1.5">
                <span>
                    {/* TODO */}
                    <span className="font-bold">{p.opinion}</span> (2137 opinions)
                </span>
            </p>
        </div>
    );
};
