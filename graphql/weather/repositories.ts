import { AsyncRepository } from "../repository/repositories";
import { ApolloError } from "apollo-server-azure-functions";

type Weather = {
  icon: string;
  summary: string;
};

type DarkSkyResponse = {
  currently: Weather;
};

class WeatherRepository extends AsyncRepository<Weather> {
  async findWeather(lat: number, long: number): Promise<DarkSkyResponse> {
    const response = await this.client.get<DarkSkyResponse>(this.resource, {
      queryParameters: {
        params: {
          lat,
          long
        }
      }
    });
    if (response.statusCode > 500)
      throw new ApolloError("Could not reach weather service");
    return response.result;
  }
}

export default WeatherRepository;
