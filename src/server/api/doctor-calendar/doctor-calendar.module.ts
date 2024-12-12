import { ReflectiveInjector } from "injection-js";
import "reflect-metadata";
import { DoctorCalendarAccess } from "./doctor-calendar.access";
import { DoctorCalendarEngine } from "./doctor-calendar.engine";

export const injector = ReflectiveInjector.resolveAndCreate([
  DoctorCalendarAccess,
  DoctorCalendarEngine,
]);
