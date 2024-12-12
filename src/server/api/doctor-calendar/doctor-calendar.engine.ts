import "reflect-metadata";
import { Injectable, type Injector } from "injection-js";
import { DoctorCalendarAccess } from "./doctor-calendar.access";
import { DI } from "~/server/di";

@Injectable()
export class DoctorCalendarEngine extends DI {
  private access: DoctorCalendarAccess;

  constructor(inj: Injector) {
    super(inj);

    this.access = this.get<DoctorCalendarAccess>(DoctorCalendarAccess);
  }

  async getCalendar(doctorId: string) {
    await this.access.createCalendarEntries(doctorId);

    return await this.access.getDoctorCalendar(doctorId);
  }
}
