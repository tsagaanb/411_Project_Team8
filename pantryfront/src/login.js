import { GoogleLogin } from 'react-google-login';
import React from 'react';
import { useNavigate } from 'react-router-dom';
//import Homepage from './homepage.js'; 

const clientId = "312871000003-3d2pb1d7jlktfuhvkcl1lpkal499s7l7.apps.googleusercontent.com";

function Login(){
    const navigate = useNavigate();
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
        // redirect to the home page after successful login
        navigate('/homepage');
    }
    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

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