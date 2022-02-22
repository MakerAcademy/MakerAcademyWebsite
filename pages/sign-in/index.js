import AuthForm from "src/pages/Auth";
import React from "react";
import { getCsrfToken, getProviders, getSession } from "next-auth/react";

const SignIn = ({providers}) => {
  return (
    <div>
      <AuthForm providers={providers}/>
    </div>
  );
};

export default SignIn;

export async function getServerSideProps(context) {

  const {req} = context;
  const session = await getSession({req});
  if (session) {
    return {
      redirect: {destination: '/'},
    };
  }
  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(),
    }
  }
}
