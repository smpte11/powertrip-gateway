import { AuthChecker } from "type-graphql";

// TODO make typing more robust here
export const checkIfAuth: AuthChecker = ({ context }) =>
  !!(context as any).user;
