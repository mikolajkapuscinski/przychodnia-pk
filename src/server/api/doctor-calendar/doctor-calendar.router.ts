import { createTRPCRouter, doctorProcedure } from "~/server/api/trpc";
import { doctorInjector } from "./doctor-calendar.module";
import { DoctorCalendarEngine } from "./doctor-calendar.engine";
import { assert } from "~/utils/assert";

export const doctorCalendarRouter = createTRPCRouter({
  getCalendar: doctorProcedure.query(async ({ ctx }) => {
    const doctorId = ctx.session.user.id;
    assert(doctorId);

    const engine = doctorInjector.get(
      DoctorCalendarEngine,
    ) as DoctorCalendarEngine;
    return engine.getCalendar(doctorId);
  }),
});
