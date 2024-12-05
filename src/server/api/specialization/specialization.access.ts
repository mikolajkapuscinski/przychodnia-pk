import { db } from "~/server/db";

export const getAllSpecializations = async () => {
  return db.specialization.findMany();
};
