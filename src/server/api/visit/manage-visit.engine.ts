import { UserRole, VisitStatus, type Visit } from "@prisma/client";
import { assert } from "~/utils/assert";
import { VisitAccess } from "./visit.access";
import { Inject } from "injection-js";

export class ManageVisitEngine {
  constructor(private visitAccess: VisitAccess) {}

  static get parameters() {
    return [new Inject(VisitAccess)];
  }

  async canCancelVisit(visit: Visit, userId: string, role: string) {
    if (visit.status !== VisitStatus.ONGOING) {
      return false;
    }

    return (
      visit.doctorId === userId ||
      visit.patientId === userId ||
      role === UserRole.RECEPTIONIST
    );
  }

  async cancelVisit(visit: Visit, userId: string, role: string) {
    const canCancel = this.canCancelVisit(visit, userId, role);
    assert(canCancel, "Cannot cancel visit", "FORBIDDEN");

    return await this.visitAccess.updateVisit(visit.id, {
      status: VisitStatus.CANCELED,
    });
  }
}
