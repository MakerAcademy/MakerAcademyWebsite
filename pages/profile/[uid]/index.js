import AuthorBanner from "@components/banners/AuthorBanner";
import ContentCard from "@components/cards/ContentCard";
import PageNotFound from "@components/errors/PageNotFound";
import { Container, Grid, Typography } from "@mui/material";
import clientPromise from "lib/db/connect";
import { getUserProfileById } from "lib/db/user";
import React from "react";

// export const dummyUser = {
//   name: "Dummy User",
//   email: "salmanfazal01@gmail.com",
//   _id: "621d4488dffa5fc6225e8257",
//   image:
//     "https://i.pinimg.com/564x/f1/da/a7/f1daa70c9e3343cebd66ac2342d5be3f.jpg",
//   emailVerified: null,
//   trustLevel: 3,
//   walletAddress: "",
//   content: [],
//   username: "salmanfazal01",
//   bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
//   profile_link: "http://localhost:3000/profile/123",
//   socials: { twitter: "#", telegram: "#", tiktok: "#", email: "#" },
//   verified: true,
// };

const Profile = ({ user }) => {
  if (!user) return <PageNotFound title={"user"} />;

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <AuthorBanner {...user} sx={{ mb: { xs: 5, md: 8 } }} />

      <Typography>Coming Soon</Typography>

      {/* TODO - replace with real users published content */}
      {/* <Grid container spacing={5}>
        {Array(10)
          .fill()
          .map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <ContentCard />
            </Grid>
          ))}
      </Grid> */}
    </Container>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  try {
    const uid = context.params.uid;

    const client = await clientPromise;
    const db = client.db();
    const data = await getUserProfileById(db, uid);

    return {
      props: {
        user: data,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return { props: {} };
}
