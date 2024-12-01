import { UserRole, VisitStatus, type Visit } from "@prisma/client";
import { assert } from "~/utils/assert";
import { updateVisit } from "./visit.access";

const canCancelVisit = (visit: Visit, userId: string, role: string) => {
  if (visit.status !== VisitStatus.ONGOING) {
    return false;
  }

  return (
    visit.doctorId === userId ||
    visit.patientId === userId ||
    role === UserRole.RECEPTIONIST
  );
};

export const cancelVisit = async (
  visit: Visit,
  userId: string,
  role: string,
) => {
  const canCancel = canCancelVisit(visit, userId, role);
  assert(canCancel, "Cannot cancel visit", "FORBIDDEN");

  return await updateVisit(visit.id, { status: VisitStatus.CANCELED });
};
