import { Inject } from "injection-js";
import { DoctorCalendarAccess } from "./doctor-calendar.access";
import { VisitAccess } from "../visit/visit.access";

export class DoctorCalendarEngine {
  constructor(
    private calendarAccess: DoctorCalendarAccess,
    private visitAccess: VisitAccess,
  ) {}

  static get parameters() {
    return [new Inject(DoctorCalendarAccess), new Inject(VisitAccess)];
  }

  async getCalendar(doctorId: string) {
    await this.calendarAccess.createCalendarEntries(doctorId);

    return await this.calendarAccess.getDoctorCalendar(doctorId);
  }
}
