import React from "react";
import { Title } from "~/components/forms/Title";
import { Drug } from "./MedicinesSection";

export const DrugModal: React.FC<Drug> = (p) => {
  return (
    <div className="max-w-[420px]">
      <Title>{p.name}</Title>
      <img className="w-full rounded-lg" src="/medicine-2.jpg" alt="drug" />
      <p className="p-2">{p.description}</p>
    </div>
  );
};
