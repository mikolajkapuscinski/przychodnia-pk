import { ReflectiveInjector } from "injection-js";
import { VisitAccess } from "./visit.access";
import { ManageVisitEngine } from "./manage-visit.engine";

export const visitElements = [VisitAccess, ManageVisitEngine];
export const visitInjector = ReflectiveInjector.resolveAndCreate(visitElements);
