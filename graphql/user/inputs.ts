import User from "./schemas";
import { Field, InputType } from "type-graphql";

@InputType()
class CredentialInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  displayName?: string;
}

export default CredentialInput;
