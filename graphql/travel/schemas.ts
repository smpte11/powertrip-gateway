import { ObjectType, Field } from "type-graphql";

import Day from "../day/schemas";

@ObjectType({
  description:
    "A planned travel. Contains a collection of days but also travel-wide information and documents.",
})
class Travel {
  @Field((_) => String, {
    description: "The name of the trip.",
    nullable: true,
  })
  name?: string;

  @Field((_) => String, {
    description: "Where the trip takes place. Generally...",
  })
  destination: string;

  @Field((_) => Date, {
    description: "The starting date of the trip.",
  })
  start: Date;

  @Field((_) => Date, {
    description: "The end date of the trip (inclusive).",
  })
  end: Date;

  @Field((_) => [Day], {
    description:
      "The days that this travel includes. Each contain further details. See Day schema.",
  })
  days: Day[];
}

export default Travel;
