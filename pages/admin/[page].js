import { withProtectedUser } from "@hoc/routes";
import Admin from "./index";

export default Admin;

export const getServerSideProps = withProtectedUser();
