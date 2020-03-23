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

export default Weather;
