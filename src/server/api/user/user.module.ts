import { ReflectiveInjector } from "injection-js";
import { DoctorEngine } from "./doctor.engine";
import { VisitAccess } from "../visit/visit.access";
import { DoctorCalendarAccess } from "../doctor-calendar/doctor-calendar.access";
import { UserAccess } from "./user.access";

export const userElements = [
  VisitAccess,
  UserAccess,
  DoctorEngine,
  DoctorCalendarAccess,
];
export const userInjector = ReflectiveInjector.resolveAndCreate(userElements);
