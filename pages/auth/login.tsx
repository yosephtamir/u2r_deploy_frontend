import React from "react";

import SEO from "@/components/SEO";
import LogInForm from "@/modules/auth/component/logInForm";

function LogIn() {
    return (
        <div>
            <SEO title='LogIn - ' description='LogIn to your U2R Technologies account.' image="" url="" />
            <LogInForm />
        </div>
    );
};

export default LogIn;