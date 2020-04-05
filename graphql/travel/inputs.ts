import { InputType, Field } from "type-graphql";
import Travel from "./schemas";

@InputType({
  description:
    "New travel data (E.g. Duration of a trip as date range, destination, etc.)",
})
class CreateTravelInput implements Partial<Travel> {
  @Field({ nullable: true })
  name?: string;

  @Field()
  destination: string;

  @Field()
  start: Date;

  @Field()
  end: Date;
}

export default CreateTravelInput;
