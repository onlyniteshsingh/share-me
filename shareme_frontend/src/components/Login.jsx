import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const resposeGoogle = (response) => {
    const val = jwt_decode(response.credential);
    // console.log(val);
    localStorage.setItem("user", JSON.stringify(val));

    const { given_name, picture, sub } = val;
    // console.log(googleId);
    const doc = {
      _id: sub,
      _type: "user",
      userName: given_name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <GoogleOAuthProvider clientId="752837040507-nedgndrl6rhostlhiscqod3k2b3a0kgr.apps.googleusercontent.com">
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="realtive w-full h-full">
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />

          <div className="absolute flex flex-col justify-center top-0 items-center right-0 left-0 bottom-0 bg-blackOverlay">
            <div className="p-5">
              <img src={logo} width="130px" alt="logo" />
            </div>
            <div className="shadow-2xl">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" /> Sing in with Google
                  </button>
                )}
                onSuccess={resposeGoogle}
                onFailure={resposeGoogle}
                cookiepolicy="single_host_origin"
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
