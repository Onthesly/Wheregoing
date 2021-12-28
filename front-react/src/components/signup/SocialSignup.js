import React from 'react';
import {
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  GOOGLE_AUTH_URL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
} from '../../constrants';

const SocialSignup = () => {
  return (
    <div className="social-signup">
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        {/* <img src={googleLogo} alt="Google" /> */}
        Sign up with Google
      </a>
      <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
        {/* <img src={fbLogo} alt="Facebook" />  */}
        Sign up with Facebook
      </a>
      <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
        {/* <img src={githubLogo} alt="Github" /> */}
        Sign up with Github
      </a>
      <a className="btn btn-block social-btn github" href={KAKAO_AUTH_URL}>
        {/* <img src={githubLogo} alt="Kakao" /> */}
        Sign up with Kakao
      </a>
      <a className="btn btn-block social-btn github" href={NAVER_AUTH_URL}>
        {/* <img src={githubLogo} alt="Naver" />  */}
        Sign up with Naver
      </a>
    </div>
  );
};

export default SocialSignup;
