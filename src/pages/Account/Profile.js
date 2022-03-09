import ProfileForm from "@components/forms/ProfileForm";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "./helperFunctions";

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const _id = router.query.id;

  useEffect(() => {
    fetchUserProfile(_id, setData).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <></>;
  }

  if (!loading && !data.email) {
    return <Typography>User not found</Typography>;
  }

  return (
    <div>
      <ProfileForm values={data} />
    </div>
  );
};

export default Profile;
