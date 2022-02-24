import { getSession } from "next-auth/react";

// Pass userdata to props if logged in
export function withUser(hideIfUserExists) {
  return async (context) => {
    const { req, params } = context;
    const data = await getSession({ req });

    if (data?.user && hideIfUserExists) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        user: data?.user || null,
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

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        user: data?.user || null,
      },
    };
  };
}
