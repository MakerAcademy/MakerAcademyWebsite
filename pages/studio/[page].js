import { withProtectedUser } from "@hoc/routes";
import CreatorStudio from "./index";

export default CreatorStudio;

export const getServerSideProps = withProtectedUser();
