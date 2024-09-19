import React, { useState} from 'react';
import VerificationLinkSent from '@/modules/auth/verificationLinkSent';
import ChangeEmailAddress from '@/modules/auth/changeEmailAddress';

import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext'

function Verification() {
    const [showChangePasswordPage, setShowChangePasswordPage] = useState(false)

    const handleClick = () => {
        setShowChangePasswordPage((prev) => !prev);
    };

    return (
        <>
            <SEO title="Verification - " description="Verification email sent to your inbox to complete signup for your U2R Technologies." image="" url="" />
            <div>{!showChangePasswordPage ? <VerificationLinkSent handleClick={handleClick} /> : <ChangeEmailAddress />}</div>
        </>
    );
};

export default Verification;