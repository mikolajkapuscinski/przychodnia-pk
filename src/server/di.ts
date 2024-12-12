import "reflect-metadata";
import { type Injector } from "injection-js";

export class DI {
  constructor(private injector: Injector) {}

  get<T>(token: any): T {
    return this.injector.get(token) as T;
  }
}
