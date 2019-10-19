import mocks from "./day/mocks";
import { match } from "./fp";

export interface Configurable {
  host: string;
  mocks: any;
  port: number;
  url: string;
  weatherChannelUrl: string;
  dayServiceUrl: string;
}

enum ENVS {
  DEV = "development",
  PROD = "production"
}

class Config implements Configurable {
  host: string = "http://localhost";
  port: number = 4000;

  public get url(): string {
    return `${this.host}:${this.url}`;
  }

  public get weatherChannelUrl(): string {
    return `http://172.18.0.2:7071`;
  }

  public get dayServiceUrl(): string {
    return `${this.host}/8081`;
  }

  public get mocks() {
    return process.env.USE_MOCKS ? mocks : {};
  }
}

class ProdConfig extends Config {}

function buildConfig(): Config {
  const env = process.env.NODE_ENV;
  return match(env)
    .on(() => env === ENVS.PROD, () => new ProdConfig())
    .otherwise(() => new Config());
}

export default buildConfig;
