import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleLoginButtonProps {
  accountType: 'student' | 'organization'; // Prop to specify account type
  onSuccess: (credentialResponse: any) => void; // Callback for successful login/signup
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ accountType, onSuccess }) => {
  const handleLoginFailure = () => {
    console.error("Google login failed.");
    alert("Google login failed. Please try again.");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
};

export default GoogleLoginButton;