import React from "react";
import { NextPage } from "next";
import { VisitSearch } from "../../features/user/create-visit/VisitSearch";
import { VisitOffer } from "../../features/user/create-visit/VisitOffer";
import { api } from "~/utils/api";

const CreateVisitPage: NextPage = () => {
  const findDoctors = api.user.findDoctors.useQuery();

  return (
    <div>
      <>
        <VisitSearch />
      </>
      <div>
        {findDoctors.data?.map((doctor, i) => (
          <VisitOffer
            firstName={doctor.firstName || ""}
            lastName={doctor.lastName || ""}
            specjalization={doctor.specialization || []}
            opinion=""
          />
        ))}
      </div>
    </div>
  );
};

export default CreateVisitPage;
