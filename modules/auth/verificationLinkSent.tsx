import React from 'react';
import VerificationLayout from './component/verificationLayout';

function VerificationLinkSent({handleClick}: {handleClick: () => void }) {


  return (
    <VerificationLayout>
      <div>
          Verification link sent
      </div>
    </VerificationLayout>
  )
};

export default VerificationLinkSent;
