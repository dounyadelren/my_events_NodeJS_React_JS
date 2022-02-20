import React from "react";
import { useNavigate } from "react-router-dom";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Facebook = () => {

    const navigate = useNavigate();

    const responseFacebook = (response) => {
        fetch('http://localhost:8000/loginFb', {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(response)
        })
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem("userLoggedIn", JSON.stringify(data.user))
            })
            .then(() => {
                navigate('/profil')
            })
            .then(() => {
                window.location.reload(true);
            })
    }

    return (
        <FacebookLogin
            appId={process.env.REACT_APP_API_FACEBOOK}
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,,email,user_friends"
            callback={responseFacebook}
            render={renderProps => (
                <button onClick={renderProps.onClick}>
                    <svg width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89c1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"></path></svg>
                </button>
            )} />
    )
}

export default Facebook