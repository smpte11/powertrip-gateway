import { ObjectType, Field } from "type-graphql";

import Day from "../day/schemas";

@ObjectType({
  description:
    "A planned travel. Contains a collection of days but also travel-wide information and documents.",
})
class Travel {
  @Field((_) => Date, {
    description: "The starting date of the trip.",
  })
  from: Date;

  @Field((_) => Date, {
    description: "The end date of the trip (inclusive).",
  })
  to: Date;

  @Field((_) => [Day], {
    description:
      "The days that this travel includes. Each contain further details. See Day schema.",
  })
  days: Day[];
}

export default Travel;
