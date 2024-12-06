import { assert } from "~/utils/assert";
import { countVisits } from "../visit/visit.access";
import { createOpinion } from "./opinion.access";

interface CreateOpinion {
  doctorId: string;
  text?: string;
  rating: number;
}

export const postOpinion = async (
  patientId: string,
  opinion: CreateOpinion,
) => {
  const visitsTogether = await countVisits({
    patientId,
    doctorId: opinion.doctorId,
  });
  assert(visitsTogether > 0, "No visits between you and the doctor");

  return await createOpinion({ patientId, ...opinion });
};
