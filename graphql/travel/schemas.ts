import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({
  description:
    "A planned travel. Contains a collection of days but also travel-wide information and documents.",
})
class Travel {
  @Field((_) => ID, {
    description: "The id of the trip.",
    nullable: true,
  })
  id?: string;

  @Field((_) => String, {
    description: "The name of the trip.",
    nullable: true,
  })
  name?: string;

  @Field((_) => String, {
    description: "Where the trip takes place. Generally...",
    nullable: true,
  })
  destination?: string;

  @Field((_) => Date, {
    description: "The starting date of the trip.",
  })
  start: Date;

  @Field((_) => Date, {
    description: "The end date of the trip (inclusive).",
  })
  end: Date;
}

export default Travel;
