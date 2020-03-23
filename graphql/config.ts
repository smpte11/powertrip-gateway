import mocks from "./day/mocks";
import { match } from "./fp";

export interface Configurable {
  mocks: any;
  mockEntireSchema: boolean;
  emitSchema: boolean;
  weatherCode?: string;
  weatherChannelUrl: string;
  dayServiceUrl: string;
}

enum ENVIRONMENTS {
  DEV = "development",
  PROD = "production"
}

class Config implements Configurable {
  public weatherChannelUrl = "http://localhost:7074/api/v1";

  public weatherCode = process.env.WEATHER_CODE;

  public dayServiceUrl = "http://day.trip/api/v1/";

  public emitSchema = true;

  public get mocks() {
    return process.env.USE_MOCKS ? mocks : undefined;
  }

  public get mockEntireSchema() {
    return process.env.MOCK_WHOLE_SCHEMA === "true";
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
