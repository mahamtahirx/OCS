import React from 'react';
import Logo from "../Components/Layout/Logo"
import AuthForm from "../Components/Forms/AuthForm"
import LoginForm from "../Components/Forms/LogInForm"

function LoginPage() {
  return (
    <div className="auth-centered">
      <div className='card'>
        <div className="auth-page-container">
          <div className="logo-wrapper">
            <Logo />
          </div>
          <AuthForm title="Sign In">
            <LoginForm />
          </AuthForm>
        </div>
      </div> 
    </div>
  );
}

export default LoginPage;
