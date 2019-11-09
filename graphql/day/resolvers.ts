import { Resolver, Query, FieldResolver, Arg } from "type-graphql";
import { Service, Inject } from "typedi";

import Day, { Weather } from "./schemas";

import { Configurable } from "../config";
import { WeatherRepository, DayRepository } from "./repositories";

@Service()
@Resolver(of => Day)
class DayResolver {
  @Inject("config")
  private readonly config!: Configurable;

  @Query(_ => Day)
  async day() {
    const dayRepository = new DayRepository({
      baseUrl: this.config.dayServiceUrl,
      resource: "days"
    });
    const response = await dayRepository.findById(1);
    return response;
  }

  @FieldResolver(_ => Weather)
  async weather(
    @Arg("lat", { defaultValue: 59.3293 }) lat: number,
    @Arg("long", { defaultValue: 18.0686 }) long: number
  ): Promise<Weather | null> {
    const weatherRepository = new WeatherRepository({
      baseUrl: this.config.weatherChannelUrl,
      resource: "api/powertrip-weather-channel"
    });

    const currentWeather = await weatherRepository.findWeather(lat, long);
    if (!currentWeather) return { icon: "", summary: "" };
    return currentWeather.currently;
  }
}

export default DayResolver;
