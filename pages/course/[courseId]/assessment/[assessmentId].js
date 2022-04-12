import { withProtectedUser } from "@hoc/routes";
import { getOneAssessment, getSubmittedAssessment } from "lib/db/assessment";
import clientPromise from "lib/db/connect";
import { getOneCourse } from "lib/db/course";
import { useRouter } from "next/router";
import Assessment from "pages/assessment/[assessmentId]";
import { generateCourseRoutes } from "..";

const AssessmentPage = ({ documents, ...props }) => {
  const router = useRouter();
  const {
    query: { courseId, assessmentId },
  } = router;

  const { previousRoute, nextRoute } = generateCourseRoutes(
    courseId,
    assessmentId,
    documents
  );

  return (
    <Assessment
      previous={{ previousRoute: previousRoute, previousText: "Previous" }}
      next={{ nextRoute: nextRoute, nextText: "Next" }}
      {...props}
    />
  );
};

export default AssessmentPage;

export const getServerSideProps = withProtectedUser(async (context, user) => {
  const id = context.params.courseId;
  const assessmentId = context.params.assessmentId;

  const client = await clientPromise;
  const db = client.db();

  const course = await getOneCourse(db, id);
  const assessment = await getOneAssessment(db, assessmentId);

  const submission = user._id
    ? await getSubmittedAssessment(db, assessmentId, user._id)
    : null;

  //   const assessment = course?.docs?.find?.((i) => i._id === docId) || {};

  if (!assessment) return { props: {} };

  return {
    props: {
      user,
      assessment,
      submission: submission._id ? submission : null,
      documents: course.documents,
    },
  };
});
