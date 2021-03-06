import AuthForm from "src/pages/Auth";
import React from "react";
import { withUser } from "@hoc/routes";

const SignUp = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export const getServerSideProps = withUser(null, { hideIfUserExists: true });

export default SignUp;
