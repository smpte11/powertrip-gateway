import { AsyncRepository } from "../repository/repositories";

type Weather = {
  icon: string;
  summary: string;
};

type DarkSkyResponse = {
  currently: Weather;
};

export class WeatherRepository extends AsyncRepository<Weather> {
  async findWeather(
    lat: number,
    long: number
  ): Promise<DarkSkyResponse | null> {
    const response = await this.client.get<DarkSkyResponse>(
      `/api/${this.resource}?lat=${lat}&long=${long}`
    );
    return response.result;
  }
}

type Day = {
  date: Date,
  activities: number[]
}

export class DayRepository extends AsyncRepository<Day> { }
