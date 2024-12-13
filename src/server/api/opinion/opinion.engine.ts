import { Inject } from "injection-js";
import { assert } from "~/utils/assert";
import { VisitAccess } from "../visit/visit.access";
import { OpinionAccess } from "./opinion.access";

interface CreateOpinion {
  doctorId: string;
  text?: string;
  rating: number;
}

export class OpinionEngine {
  constructor(
    private visitAccess: VisitAccess,
    private opinionAccess: OpinionAccess,
  ) {}

  static get parameters() {
    return [new Inject(VisitAccess), new Inject(OpinionAccess)];
  }

  async postOpinion(patientId: string, opinion: CreateOpinion) {
    const visitsTogether = await this.visitAccess.countVisits({
      patientId,
      doctorId: opinion.doctorId,
    });
    assert(visitsTogether > 0, "No visits between you and the doctor");

    return await this.opinionAccess.createOpinion({ patientId, ...opinion });
  }
}
