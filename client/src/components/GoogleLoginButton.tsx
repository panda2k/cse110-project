// src/components/GoogleLoginButton.tsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton: React.FC = () => {
  const handleLoginSuccess = (credentialResponse: any) => {
    console.log("Login Success:", credentialResponse);
    // Handle login success here, e.g., store token or user info
  };

  const handleLoginFailure = () => {
    console.error("Login Failed");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
};

export default GoogleLoginButton;
