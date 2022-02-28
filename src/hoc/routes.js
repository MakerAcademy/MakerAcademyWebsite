import { getSession } from "next-auth/react";
import { connectToDB } from "../../lib/db/connect";

// Pass userdata to props if logged in
export function withUser(hideIfUserExists) {
  return async (context) => {
    const { req, params } = context;
    const data = await getSession({ req });

    if (data?.session?.user && hideIfUserExists) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    const {
      session: { user },
      profile,
    } = data;

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        user: { ...user, ...profile },
      },
    };
  };
}

// Redirect to login if not authenticated
export function withProtectedUser() {
  return async (context) => {
    const { req } = context;
    const data = await getSession({ req });

    if (!data?.session?.user) {
      return {
        redirect: {
          destination: "/sign-in",
        },
      };
    }

    const {
      session: { user },
      profile,
    } = data;

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        user: { ...user, ...profile },
      },
    };
  };
}
