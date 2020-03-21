import { Resolver, Query, FieldResolver, Arg } from "type-graphql";
import { Service, Inject } from "typedi";

import Day, { Weather } from "./schemas";

import { Configurable } from "../config";
import { WeatherRepository, DayRepository } from "./repositories";

@Service()
@Resolver(of => Day)
class DayResolver {
  private readonly config!: Configurable;

  dayRepository: DayRepository;
  weatherRepository: WeatherRepository;

  constructor(@Inject("config") config: Configurable) {
    this.dayRepository = new DayRepository({
      baseUrl: config.dayServiceUrl,
      resource: "days"
    });

    this.weatherRepository = new WeatherRepository({
      baseUrl: config.weatherChannelUrl,
      resource: "api/powertrip-weather-channel"
    });
  }

  @Query(_ => Day)
  async day() {
    const response = await this.dayRepository.findById(1);
    return response;
  }

  @FieldResolver(_ => Weather)
  async weather(
    @Arg("lat", { defaultValue: 59.3293 }) lat: number,
    @Arg("long", { defaultValue: 18.0686 }) long: number
  ): Promise<Weather | null> {
    const currentWeather = await this.weatherRepository.findWeather(lat, long);
    if (!currentWeather) return { icon: "", summary: "" };
    return currentWeather.currently;
  }
}

export default DayResolver;
