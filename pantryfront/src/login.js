import { GoogleLogin } from 'react-oauth/google';
import React from 'react';
import { useNavigate } from 'react-router-dom';
//import Homepage from './homepage.js'; 

//const clientId = "312871000003-3d2pb1d7jlktfuhvkcl1lpkal499s7l7.apps.googleusercontent.com";
<GoogleOAuthProvider clientId="http://312871000003-3d2pb1d7jlktfuhvkcl1lpkal499s7l7.apps.googleusercontent.com">...</GoogleOAuthProvider>;

function Login(){
    const navigate = useNavigate();
    <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
    return(
    <div id="signInButton">
        <GoogleLogin 
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    </div>
    )

}
export default Login;