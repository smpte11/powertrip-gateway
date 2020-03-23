import { Resolver, Query, FieldResolver, Arg, Root } from "type-graphql";
import { Service, Inject } from "typedi";

import Day from "./schemas";
import WeatherRepository from "../weather/repositories";
import { Configurable } from "../config";
import { ApolloError } from "apollo-server-azure-functions";

@Service()
@Resolver(() => Day)
class DayResolver {
  private readonly weatherRepository: WeatherRepository;

  constructor(@Inject("config") config: Configurable) {
    this.weatherRepository = new WeatherRepository({
      baseUrl: config.weatherChannelUrl,
      resource: "weather"
    });
  }

  @Query(_ => Day)
  async day() {}

  @FieldResolver()
  async weather(
    @Arg("lat", { defaultValue: 59.3293 }) lat: number,
    @Arg("long", { defaultValue: 18.068 }) long: number,
    @Root() day: Day // add specific date eventually
  ) {
    try {
      const currentWeather = await this.weatherRepository.findWeather(
        lat,
        long
      );
      if (!currentWeather) return { icon: "", summary: "" };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  }
}

export default DayResolver;
