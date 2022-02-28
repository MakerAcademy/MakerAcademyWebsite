import { getSession } from "next-auth/react";
import { connectToDB } from "../../lib/db/connect";

// Pass userdata to props if logged in
export function withUser(hideIfUserExists) {
  return async (context) => {
    const { req, params } = context;
    const data = await getSession({ req });

    if (data && hideIfUserExists) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    const { session, profile } = data || {};

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        user: { ...(session?.user || {}), ...profile },
      },
    };
  };
}

// Redirect to login if not authenticated
export function withProtectedUser() {
  return async (context) => {
    const { req } = context;
    const data = await getSession({ req });

    if (!data) {
      return {
        redirect: {
          destination: "/sign-in",
        },
      };
    }

    const { session, profile } = data || {};

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        user: { ...(session?.user || {}), ...profile },
      },
    };
  };
}
