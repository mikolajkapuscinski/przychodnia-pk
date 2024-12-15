import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "~/components/forms/Button";
import { Logo } from "~/components/navbar/Logo";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("session", session);
  }, [session]);

  const openDashboard = () => {
    void router.push(`${session?.user.role?.toLowerCase()}/dashboard`);
  };

  const register = () => {
    void router.push(`user/register`);
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

                {session ? (
                  <>
                    <h1 className="text-3xl font-bold">
                      Hello, {session.user.name}!
                    </h1>
                    <p className="text-gray-500">Continue to your dashboard</p>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold">Welcome back!</h1>
                    <p className="text-gray-500">
                      Please sign in to get started
                    </p>
                  </>
                )}
              </div>

              <div className="space-y-4">
                {session ? (
                  <>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={openDashboard}
                    >
                      Open Dashboard
                    </Button>

                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => void signOut()}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => void signIn()}
                    >
                      Log In
                    </Button>

                    <Button variant="primary" size="lg" onClick={register}>
                      Register as Patient
                    </Button>
                  </>
                )}
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
