import { Inject } from "injection-js";
import { VisitAccess } from "../visit/visit.access";
import { DoctorCalendarAccess } from "../doctor-calendar/doctor-calendar.access";
import { UserAccess } from "./user.access";
import { assert } from "~/utils/assert";
import { OpinionAccess } from "../opinion/opinion.access";

export class DoctorEngine {
  constructor(
    private userAccess: UserAccess,
    private visitAccess: VisitAccess,
    private doctorCalendarAccess: DoctorCalendarAccess,
    private opinionAccess: OpinionAccess,
  ) {}

  static get parameters() {
    return [
      new Inject(UserAccess),
      new Inject(VisitAccess),
      new Inject(DoctorCalendarAccess),
      new Inject(OpinionAccess),
    ];
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

  async findDoctorsWithOpinions() {
    const doctors = await this.userAccess.findDoctors();
    const opinions = await this.opinionAccess.getOpinionSummary();

    return doctors.map((doctor) => {
      return {
        ...doctor,
        opinions: opinions[doctor.id],
      };
    });
  }
}
