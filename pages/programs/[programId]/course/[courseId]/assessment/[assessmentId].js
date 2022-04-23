import { withProtectedUser } from "@hoc/routes";
import { getOneAssessment } from "lib/db/assessment";
import clientPromise from "lib/db/connect";
import Assessment from "pages/assessment/[assessmentId]";

const AssessmentPage = (props) => {
  return <Assessment {...props} />;
};

export default AssessmentPage;

export const getServerSideProps = withProtectedUser(async (context, user) => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const assessment = await getOneAssessment(db, context.params.assessmentId);

    if (!assessment) return { props: {} };

    return {
      props: {
        user,
        assessment: assessment,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return { props: {} };
});
