import ProfileForm from "@components/forms/ProfileForm";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "./helperFunctions";

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const _id = router.query.uid;

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

  const handleSubmit = async (data) => {
    // return console.log(data);

    const res = await fetch(`/api/users?updateProfile=true&&_id=${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    }).then((response) => {
      if (response.ok) console.log("Updated");
    });
  };

  return (
    <div>
      <ProfileForm values={data} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Profile;
