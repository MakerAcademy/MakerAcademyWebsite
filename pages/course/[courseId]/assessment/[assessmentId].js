import { withProtectedUser } from "@hoc/routes";
import { getOneAssessment } from "lib/db/assessment";
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

  const client = await clientPromise;
  const db = client.db();

  const course = await getOneCourse(db, id);
  const assessment = await getOneAssessment(db, context.params.assessmentId);

  //   const assessment = course?.docs?.find?.((i) => i._id === docId) || {};

  if (!assessment) return { props: {} };

  return {
    props: {
      user,
      assessment: assessment,
      documents: course.documents,
    },
  };
});
