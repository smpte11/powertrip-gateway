import { ObjectType, Field, Int } from "type-graphql";
import Weather from "../weather/schemas";

@ObjectType({
  description:
    "Day within a travel. Describes a collection of activities, tasks, notes, etc.",
})
class Day {
  @Field((type) => Date, {
    description: "The current date.",
    nullable: true,
  })
  date?: Date;

  @Field((type) => [Int], {
    description: "A list of activities for a given day.",
    nullable: true,
  })
  activities?: number[];

  @Field((type) => Weather, {
    description: "The weather for a given day",
    nullable: true,
  })
  weather?: Weather;
}

export default Day;
