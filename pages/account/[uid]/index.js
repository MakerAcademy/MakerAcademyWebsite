import { withProtectedUser } from "@hoc/routes";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AccountPage = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/account/${user._id}/profile`);
  }, []);

  return <div></div>;
};

export const getServerSideProps = withProtectedUser();

export default AccountPage;
