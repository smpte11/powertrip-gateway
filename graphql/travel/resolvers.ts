import { Resolver, Query, Mutation, Arg } from "type-graphql";
import Travel from "./schemas";
import CreateTravelInput from "./inputs";

@Resolver()
class TravelResolver {
  @Query((_) => Travel)
  async travel() {}

  @Mutation((_) => Travel)
  async createTravel(
    @Arg("travel") newTravelData: CreateTravelInput
  ): Promise<Travel> {
    return Promise.resolve({
      ...newTravelData,
      days: [{}],
    });
  }
}

export default TravelResolver;
