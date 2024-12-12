import { ReflectiveInjector } from "injection-js";
import "reflect-metadata";
import { DoctorCalendarAccess } from "./doctor-calendar.access";
import { DoctorCalendarEngine } from "./doctor-calendar.engine";
import { visitElements } from "../visit/visit.module";

export const doctorElements = [
  ...visitElements,
  DoctorCalendarAccess,
  DoctorCalendarEngine,
];
export const doctorInjector =
  ReflectiveInjector.resolveAndCreate(doctorElements);
