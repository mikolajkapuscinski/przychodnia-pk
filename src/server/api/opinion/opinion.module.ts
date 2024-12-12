import { ReflectiveInjector } from "injection-js";
import { OpinionAccess } from "./opinion.access";
import { OpinionEngine } from "./opinion.engine";
import { VisitAccess } from "../visit/visit.access";

export const opinionElements = [OpinionAccess, OpinionEngine, VisitAccess];
export const opinionInjector =
  ReflectiveInjector.resolveAndCreate(opinionElements);
