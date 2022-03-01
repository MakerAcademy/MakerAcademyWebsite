import { withUser } from "@hoc/routes";
import { useRouter } from "next/router";
import React from "react";
import AuthForm from "src/pages/Auth";

const SignIn = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export const getServerSideProps = withUser(null, { hideIfUserExists: true });

export default SignIn;
