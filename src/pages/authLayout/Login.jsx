// import React from "react";

import { SignInForm } from "@/components/Auth/SignInForm";
import { SignUpForm } from "@/components/Auth/SignUpForm";
import { useState } from "react";

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <div
        className={`bg-white w-full h-full  flex  rounded-2xl shadow-lg overflow-hidden`}
      >
        <SignInForm showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
        <SignUpForm showSignUp={showSignUp} setShowSignUp={setShowSignUp} />

        <div className={`w-1/2  hidden rounded-r-2xl lg:block bg-muted`}>
          <img
            src="https://ui.shadcn.com/placeholder.svg"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
