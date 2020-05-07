import { ApolloError } from "apollo-server-azure-functions";
import { Inject } from "typedi";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

import Travel from "./schemas";
import CreateTravelInput from "./inputs";
import TravelRepository from "./repositories";

import { Configurable } from "../config";

@Resolver()
class TravelResolver {
  private readonly travelRepository: TravelRepository;

  constructor(@Inject("config") config: Configurable) {
    this.travelRepository = new TravelRepository({
      baseUrl: config.travelServiceUrl,
      resource: "travels",
    });
  }

  @Query((_) => [Travel])
  async travels() {}

  @Query((_) => Travel)
  async travel() {}

  @Mutation((_) => Travel)
  async createTravel(
    @Arg("newTravel") newTravelData: CreateTravelInput
  ): Promise<Travel> {
    const { start, end, ...rest } = await this.travelRepository.create(
      newTravelData
    );
    return {
      ...rest,
      start: new Date(start),
      end: new Date(end),
    };
  }
}

export default TravelResolver;
