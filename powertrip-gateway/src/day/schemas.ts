import { ObjectType, Field } from "type-graphql";

@ObjectType({
  description: "Weather for a given day. Info provided by DarkSky."
})
export class Weather implements Weather {
  @Field(type => String, { description: "The icon for the day's weather" })
  icon!: string;
  @Field(type => String, {
    description: "A short summary of the day's weather"
  })
  summary!: string;
}

@ObjectType({
  description:
    "Day within a trip. Describes a collection of activities, tasks, notes, etc."
})
class Day {
  @Field(type => Date, {
    description: "The current date.",
    nullable: true
  })
  date!: Date;

  @Field(type => Weather, { defaultValue: null, nullable: true })
  weather?: Weather;
}

export default Day;
