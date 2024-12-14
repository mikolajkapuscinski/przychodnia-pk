import NextAuth from "next-auth";

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = uncachedAuth;

export { auth, handlers, signIn, signOut };
