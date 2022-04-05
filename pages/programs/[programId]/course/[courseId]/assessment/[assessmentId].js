import { withProtectedUser } from "@hoc/routes";
import { Box } from "@mui/material";
import { getOneAssessment } from "lib/db/assessment";
import clientPromise from "lib/db/connect";
import Assessment from "pages/assessment/[assessmentId]";

const AssessmentPage = (props) => {
  return <Assessment {...props} />;
};

export default AssessmentPage;

export const getServerSideProps = withProtectedUser(async (context, user) => {
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
});
