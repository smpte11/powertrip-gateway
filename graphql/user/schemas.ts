import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class User {
  @Field((_) => ID, {
    nullable: true,
  })
  id?: string;

  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field()
  isLogged: boolean;
}

export default User;
