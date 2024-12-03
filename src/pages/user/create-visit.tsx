import React from "react";
import { NextPage } from "next";
import { VisitSearch } from "../../features/user/create-visit/VisitSearch";
import { VisitOffer } from "../../features/user/create-visit/VisitOffer";


const CreateVisitPage: NextPage = () => {
    return (
        <div>
            <div>
                <VisitSearch />
            </div>
            <div>
                {/* TODO */}
                <VisitOffer 
                    firstName="dr n. med. Michael" 
                    lastName="Apple"
                    specjalization={[
                        { id: "1", name: "Gynecologists" },
                        { id: "2", name: "Senior Developer" },
                    ]} 
                    opinion="4.9"
                />
            </div>
        </div>
    );
};

export default CreateVisitPage;
