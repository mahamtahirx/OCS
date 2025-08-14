import React from 'react';
import PropTypes from 'prop-types';

function AuthForm({ title, children }) {
  return (
    
    <div className="auth-form-container">
      <h2>{title}</h2>
      <>{children}</>
    </div>
  );
}

AuthForm.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};


export default AuthForm;
