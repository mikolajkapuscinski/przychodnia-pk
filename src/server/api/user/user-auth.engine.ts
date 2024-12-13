import { type User } from "next-auth";
import { UserAccess } from "./user.access";
import { compare } from "~/server/utils/hashing.util";
import { Inject } from "injection-js";

export class UserAuthEngine {
  constructor(private userAccess: UserAccess) {}

  static get parameters() {
    return [new Inject(UserAccess)];
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
