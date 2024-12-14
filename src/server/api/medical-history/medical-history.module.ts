import { ReflectiveInjector } from "injection-js";
import { MedicalHistoryAccess } from "./medical-history.access";
import { MedicalHistoryEngine } from "./medical-history.engine";

export const medicalHistoryElements = [
  MedicalHistoryAccess,
  MedicalHistoryEngine,
];
export const medicalHistoryInjector = ReflectiveInjector.resolveAndCreate(
  medicalHistoryElements,
);
