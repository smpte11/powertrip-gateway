import { ApolloError } from "apollo-server-azure-functions";
import { Query, Arg } from "type-graphql";
import { Service, Inject } from "typedi";

import Weather from "./schemas";
import WeatherRepository from "./repositories";

import { Configurable } from "../config";

@Service()
class WeatherResolver {
  private readonly weatherRepository: WeatherRepository;

  constructor(@Inject("config") config: Configurable) {
    this.weatherRepository = new WeatherRepository({
      baseUrl: config.weatherChannelUrl,
      resource: "weather",
      extraConfig: {
        headers: {
          "x-functions-key": config?.weatherCode,
        },
      },
    });
  }

  @Query((_) => Weather)
  async weather(
    @Arg("lat", { defaultValue: 59.3293 }) lat: number,
    @Arg("long", { defaultValue: 18.068 }) long: number
  ): Promise<Weather> {
    try {
      const { currently } = await this.weatherRepository.findWeather(lat, long);
      return {
        icon: currently.icon,
        summary: currently.summary,
      };
    } catch (error) {
      throw new ApolloError(error.message);
    }
  }
}

export default WeatherResolver;
