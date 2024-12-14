import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "~/components/forms/Button";
import { Logo } from "~/components/navbar/Logo";

export default function Home() {
  const { data: session } = useSession();

  const login = () => {
    //
  };

  const register = () => {
    //
  };

  return (
    <>
      <Head>
        <title>omed.live</title>
        <meta
          name="description"
          content="Omed.live is created by students at PK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="h-screen w-screen"
        style={{
          backgroundImage: "url(/hero.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="min-h-screen w-full lg:grid lg:grid-cols-3">
          {/* Left column with illustration */}
          <div className="col-span-2 hidden p-8 lg:flex lg:items-center lg:justify-center"></div>

          {/* Right column with form */}
          <div className="flex h-screen items-center justify-center bg-backgound p-6 lg:p-8">
            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-2 text-center">
                <div className="flex justify-center">
                  <Logo />
                </div>
                <h1 className="text-3xl font-bold">Welcome back!</h1>
                <p className="text-gray-500">Please sign in to get started</p>
              </div>

              <div className="space-y-4">
                <Button variant="secondary" size="lg" onClick={login}>
                  Log In
                </Button>

                <Button variant="primary" size="lg" onClick={register}>
                  Register as Patient
                </Button>
              </div>

              <div className="text-center text-sm">
                By continuing you agree to our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
