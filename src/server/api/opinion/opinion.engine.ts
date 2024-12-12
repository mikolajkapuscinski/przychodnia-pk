import "reflect-metadata";
import { Injectable, type Injector } from "injection-js";
import { assert } from "~/utils/assert";
import { VisitAccess } from "../visit/visit.access";
import { OpinionAccess } from "./opinion.access";
import { DI } from "~/server/di";

interface CreateOpinion {
  doctorId: string;
  text?: string;
  rating: number;
}

@Injectable()
export class OpinionEngine extends DI {
  private visitAccess: VisitAccess;
  private opinionAccess: OpinionAccess;

  constructor(inj: Injector) {
    super(inj);

    this.visitAccess = this.get<VisitAccess>(VisitAccess);
    this.opinionAccess = this.get<OpinionAccess>(OpinionAccess);
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
