import { ReflectiveInjector } from "injection-js";
import { VisitAccess } from "./visit.access";
import { ManageVisitEngine } from "./manage-visit.engine";
import { DrugAccess } from "../drug/drug.access";

export const visitElements = [VisitAccess, ManageVisitEngine, DrugAccess];
export const visitInjector = ReflectiveInjector.resolveAndCreate(visitElements);
