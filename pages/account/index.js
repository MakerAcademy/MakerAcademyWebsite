import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useMemo } from "react";

const AccountPage = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push("/account/profile");
  }, []);

  return <div></div>;
};

export default AccountPage;
