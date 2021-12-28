import React from 'react';
import { Redirect } from 'react-router-dom';
import SocialSignup from './SocialSignup';

const Signup = () => {
  if (this.props.authenticated) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location },
        }}
      />
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">Signup with SpringSocial</h1>
        <SocialSignup />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        {/* <SignupForm {...this.props} />
          <span className="login-link">
            Already have an account? <Link to="/login">Login!</Link>
          </span> */}
      </div>
    </div>
  );
};

export default Signup;
