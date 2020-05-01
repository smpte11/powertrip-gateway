import dayMocks from "./day/mocks";
import travelMock from "./travel/mocks";
import weatherMock from "./weather/mocks";

import { match } from "./fp";

export interface Configurable {
  mocks: any;
  mockEntireSchema: boolean;
  emitSchema: boolean;
  weatherCode?: string;
  travelServiceUrl: string;
  weatherChannelUrl: string;
  dayServiceUrl: string;
}

enum ENVIRONMENTS {
  DEV = "development",
  PROD = "production",
}

class Config implements Configurable {
  public travelServiceUrl = "http://localhost:8081/api/v1";

  public weatherChannelUrl = "http://localhost:7074/api/v1";

  public weatherCode = process.env.WEATHER_CODE;

  public dayServiceUrl = "http://day.trip/api/v1/";

  public emitSchema = true;

  public get mocks() {
    return process.env.USE_MOCKS
      ? {
          ...dayMocks,
          ...travelMock,
          ...weatherMock,
          DateTime: () => new Date(),
        }
      : undefined;
  }

  public get mockEntireSchema() {
    return process.env.MOCK_RESOLVERS === "true";
  }
}

class ProdConfig extends Config {
  public weatherChannelUrl =
    "https://powertrip-weather-channel.azurewebsites.net/api/v1/";

  public weatherCode = process.env.WEATHER_CODE;

  public emitSchema = false;
}

function buildConfig(): Config {
  const env = process.env.NODE_ENV;
  return match(env)
    .on(
      () => env === ENVIRONMENTS.PROD,
      () => new ProdConfig()
    )
    .otherwise(() => new Config());
}

export default buildConfig;
