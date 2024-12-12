import "reflect-metadata";
import { Injectable } from "injection-js";
import { db } from "~/server/db";

const DAY_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class DoctorCalendarAccess {
  async createCalendarEntries(doctorId: string) {
    // TODO: refactor this to engine
    const lastDay = await db.doctorCalendarDay.findFirst({
      where: {
        doctorId,
      },
      orderBy: {
        date: "desc",
      },
    });

    const startDate = lastDay
      ? new Date(lastDay.date.getTime() + DAY_MS)
      : new Date();

    const endDate = new Date(startDate.getTime() + 30 * DAY_MS);

    const dates = [];
    for (
      let current = startDate;
      current < endDate;
      current.setDate(current.getDate() + 1)
    ) {
      dates.push(new Date(current));
    }

    const existingDays = await db.doctorCalendarDay.findMany({
      where: {
        doctorId,
        date: {
          in: dates,
        },
      },
    });

    const existingDates = new Set(
      existingDays.map((day) => day.date.toISOString()),
    );

    const newDates = dates.filter(
      (date) => !existingDates.has(date.toISOString()),
    );

    const startHour = 9;
    const endHour = 17;

    const newEntries = newDates.map((date) => ({
      doctorId,
      date: date,
      startHour,
      endHour,
    }));

    await db.doctorCalendarDay.createMany({
      data: newEntries,
      skipDuplicates: true,
    });
  }

  async getDoctorCalendar(doctorId: string) {
    const calendar = await db.doctorCalendarDay.findMany({
      where: {
        doctorId,
      },
    });
    return calendar;
  }
}
