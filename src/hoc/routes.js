import { getSession } from "next-auth/react";

// Pass userdata to props if logged in
export function withUser(gssp, options = {}) {
  const { hideIfUserExists } = options;
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

    const userData = { ...(session?.user || {}), ...profile };

    const gsspData = gssp ? await gssp(context, userData) : { props: {} };

    if (gsspData.redirect) {
      return gsspData;
    }

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        ...gsspData.props,
        user: userData,
      },
    };
  };
}

// Redirect to login if not authenticated
export function withProtectedUser(gssp, options = {}) {
  const { trustLevel } = options;
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

    if (!!trustLevel && profile.trustLevel < trustLevel) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    const userData = { ...(session?.user || {}), ...profile };

    const gsspData = gssp ? await gssp(context, userData) : { props: {} };

    if (gsspData.redirect) {
      return gsspData;
    }

    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        ...gsspData.props,
        user: userData,
      },
    };
  };
}
