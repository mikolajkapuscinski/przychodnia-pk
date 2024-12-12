import "reflect-metadata";
import { Injectable, type Injector } from "injection-js";
import { DoctorCalendarAccess } from "./doctor-calendar.access";
import { DI } from "~/server/di";
import { VisitAccess } from "../visit/visit.access";

@Injectable()
export class DoctorCalendarEngine extends DI {
  private calendarAccess: DoctorCalendarAccess;
  private visitAccess: VisitAccess;

  constructor(inj: Injector) {
    super(inj);

    this.calendarAccess = this.get<DoctorCalendarAccess>(DoctorCalendarAccess);
    this.visitAccess = this.get<VisitAccess>(VisitAccess);
  }

  async getCalendar(doctorId: string) {
    await this.calendarAccess.createCalendarEntries(doctorId);

    return await this.calendarAccess.getDoctorCalendar(doctorId);
  }
}
