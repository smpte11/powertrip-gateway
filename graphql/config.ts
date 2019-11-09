import mocks from "./day/mocks";
import { match } from "./fp";

export interface Configurable {
  host: string;
  mocks: any;
  port: number;
  weatherChannelUrl: string;
  dayServiceUrl: string;
}

enum ENVIRONMENTS {
  DEV = "development",
  PROD = "production"
}

class Config implements Configurable {
  host: string = "http://localhost";
  port: number = 4000;

  public get weatherChannelUrl(): string {
    return `${this.host}:7073`;
  }

  public get dayServiceUrl(): string {
    return `${this.host}:8082`;
  }

  public get mocks() {
    return process.env.USE_MOCKS ? mocks : undefined;
  }
}

class ProdConfig extends Config {}

function buildConfig(): Config {
  const env = process.env.NODE_ENV;
  return match(env)
    .on(() => env === ENVIRONMENTS.PROD, () => new ProdConfig())
    .otherwise(() => new Config());
}

export default buildConfig;
