import { Resolver, Query } from "type-graphql";
import Travel from "./schemas";

@Resolver()
class TravelResolver {
  @Query((_) => Travel)
  async travel() {}
}

export default TravelResolver;
