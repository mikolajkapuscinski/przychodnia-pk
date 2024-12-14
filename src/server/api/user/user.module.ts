import { ReflectiveInjector } from "injection-js";
import { DoctorEngine } from "./doctor.engine";
import { VisitAccess } from "../visit/visit.access";
import { DoctorCalendarAccess } from "../doctor-calendar/doctor-calendar.access";
import { UserAccess } from "./user.access";
import { UserAuthEngine } from "./user-auth.engine";
import { OpinionAccess } from "../opinion/opinion.access";

export const userElements = [
  VisitAccess,
  UserAccess,
  UserAuthEngine,
  DoctorEngine,
  DoctorCalendarAccess,
  OpinionAccess,
];
export const userInjector = ReflectiveInjector.resolveAndCreate(userElements);
