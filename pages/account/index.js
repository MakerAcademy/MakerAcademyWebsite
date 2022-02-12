import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AccountPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/account/profile");
  });

  return <div>AccountPage</div>;
};

export default AccountPage;
