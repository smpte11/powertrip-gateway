import * as rm from "typed-rest-client/RestClient";
import { Resolver, Query, FieldResolver, Arg, Field } from "type-graphql";
import { Service, Inject } from "typedi";

import Day, { Weather } from "./schemas";

import { Configurable } from "../config";
import { WeatherRepository, DayRepository } from "./repositories";

@Service()
@Resolver(of => Day)
class DayResolver {
  @Inject("config")
  private readonly config!: Configurable;

  @Field({ description: "Scheduled day's date on the calendar. Usefull to get temporal data of the trip." })
  date!: Date;

  @Field(() => [Number], { nullable: true, description: "Scheduled activities for the day." })
  activities?: number[];

  @Query(returns => Day)
  async day() {
    const dayRepository = new DayRepository(
      new rm.RestClient('day-resolver', this.config.dayServiceUrl),
      { resource: 'day' }
    )
    const day = await dayRepository.findOne(1)
    return day;
  }

  @FieldResolver()
  async weather(
    @Arg("lat", { defaultValue: 59.3293 }) lat: number,
    @Arg("long", { defaultValue: 18.0686 }) long: number
  ): Promise<Weather | null> {
    const weatherRepository = new WeatherRepository(
      new rm.RestClient("weather-resolver", this.config.weatherChannelUrl),
      { resource: "powertrip-weather-channel" }
    );

    const currentWeather = await weatherRepository.findWeather(lat, long);
    if (!currentWeather) return { icon: "", summary: "" };
    return currentWeather.currently;
  }
}

export default DayResolver;
