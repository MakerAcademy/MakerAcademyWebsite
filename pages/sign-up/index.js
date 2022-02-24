import AuthForm from "src/pages/Auth";
import React from "react";

const SignUp = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export const getServerSideProps = withUser(true);

export default SignUp;
