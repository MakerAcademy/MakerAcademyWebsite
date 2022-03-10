import { withProtectedUser } from "@hoc/routes";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Admin = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/pending", undefined, { shallow: true });
  }, []);

  return <div></div>;
};

export default Admin;

export const getServerSideProps = withProtectedUser(null, { trustLevel: 3 });
