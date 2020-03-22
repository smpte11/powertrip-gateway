import mocks from "./day/mocks";
import { match } from "./fp";
import path from "path";

export interface Configurable {
  mocks: any;
  mockEntireSchema: boolean;
  emitSchema: boolean;
  weatherChannelUrl: string;
  dayServiceUrl: string;
}

enum ENVIRONMENTS {
  DEV = "development",
  PROD = "production"
}

class Config implements Configurable {
  public get weatherChannelUrl(): string {
    return `http://localhost:7073/api/v1`;
  }

  public get dayServiceUrl(): string {
    return "http://day.trip/api/v1";
  }

  public get mocks() {
    return process.env.USE_MOCKS ? mocks : undefined;
  }

  public get mockEntireSchema() {
    return process.env.MOCK_WHOLE_SCHEMA === "true";
  }

  public get emitSchema() {
    return true;
  }
}

class ProdConfig extends Config {
  public get emitSchema() {
    return false;
  }

  public get weatherChannelUrl(): string {
    return `https://powertrip-weather-channel.azurewebsites.net/api/v1`;
  }
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
