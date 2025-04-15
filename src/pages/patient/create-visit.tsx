import React from "react";
import { type NextPage } from "next";
import { VisitSearch } from "../../features/user/create-visit/VisitSearch";
import { Navbar } from "~/components/navbar/Navbar";
import { Button } from "~/components/forms/Button";
import router from "next/router";
import { useSession } from "next-auth/react";

const CreateVisitPage: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Navbar>
        <Button 
          variant="secondary"
          size="base"
          onClick={async () => {
            await router.push(`/${sessionData?.user?.role?.toLowerCase()}/dashboard`);
          }}
        >
          Dashboard
        </Button>
        <Button
          variant="primary"
          size="base"
          onClick={async () => {
            await router.push("create-visit");
          }}
        >
          Schedule&nbsp;visit
        </Button>
        <Button variant="secondary" size="base">
          Doctors
        </Button>
        <Button variant="secondary" size="base">
          Medications
        </Button>
      </Navbar>
      <VisitSearch />
    </>
  );
};

export default CreateVisitPage;
