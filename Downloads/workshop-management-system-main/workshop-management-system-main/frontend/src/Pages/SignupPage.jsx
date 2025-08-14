
import React from 'react';
import Logo from "../Components/Layout/Logo"
import AuthForm from "../Components/Forms/AuthForm"
import SignupForm from "../Components/Forms/SignUpForm"

function SignupPage() {
  return (
    <div className="auth-centered">
      <div className='card'>
        <div className="auth-page-container">
          <div className="logo-wrapper">
            <Logo />
          </div>
          <AuthForm title="Create an account">
            <SignupForm />
          </AuthForm>
        </div>
      </div> 
    </div>
  );
}

export default SignupPage;
