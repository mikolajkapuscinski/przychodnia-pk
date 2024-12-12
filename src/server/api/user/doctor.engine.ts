import { type Injector } from "injection-js";
import { DI } from "~/server/di";
import { VisitAccess } from "../visit/visit.access";
import { DoctorCalendarAccess } from "../doctor-calendar/doctor-calendar.access";
import { UserAccess } from "./user.access";
import { assert } from "~/utils/assert";

export class DoctorEngine extends DI {
  private userAccess: UserAccess;
  private visitAccess: VisitAccess;
  private doctorCalendarAccess: DoctorCalendarAccess;

  constructor(injector: Injector) {
    super(injector);

    this.userAccess = this.get<UserAccess>(UserAccess);
    this.visitAccess = this.get<VisitAccess>(VisitAccess);
    this.doctorCalendarAccess =
      this.get<DoctorCalendarAccess>(DoctorCalendarAccess);
  }

  async getAllDoctorsAvailability() {
    const doctors = await this.userAccess.findDoctors();

    const promises = doctors.map(async (doctor) => {
      assert(doctor.id);
      return {
        doctorId: doctor.id,
        availability: await this.getDoctorAvailability(doctor.id),
      };
    });

    return Promise.all(promises);
  }

  async getDoctorAvailability(doctorId: string) {
    const visits = await this.visitAccess.findVisits({
      doctorId,
      date: { gte: new Date() },
    });

    const calendar =
      await this.doctorCalendarAccess.getDoctorCalendar(doctorId);

    const sameDay = (a: Date, b: Date) => a.getDate() === b.getDate();

    const availability = calendar.map((day) => {
      const visitsDay = visits.filter((visit) => sameDay(visit.date, day.date));

      return {
        date: day.date,
        startHour: day.startHour,
        endHour: day.endHour,
        busyHours: visitsDay.map((v) => v.date.getHours()),
      };
    });

    return availability;
  }
}
