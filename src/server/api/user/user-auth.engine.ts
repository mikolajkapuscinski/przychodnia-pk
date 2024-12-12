import "reflect-metadata";
import { type User } from "next-auth";
import { UserAccess } from "./user.access";
import { compare } from "~/server/utils/hashing.util";
import { DI } from "~/server/di";
import { Injectable, type Injector } from "injection-js";

@Injectable()
export class UserAuthEngine extends DI {
  private userAccess: UserAccess;

  constructor(injector: Injector) {
    super(injector);

    this.userAccess = this.get<UserAccess>(UserAccess);
  }

  async authorize(email: string, password: string): Promise<User | null> {
    const user = await this.userAccess.findUserByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await compare(password, user.passwordHash);
    if (!isMatch) {
      return null;
    }

    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
    };
  }
}
