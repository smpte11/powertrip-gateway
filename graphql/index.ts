import "reflect-metadata";

import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "apollo-server-azure-functions";

import { Container } from "typedi";

import DayResolver from "./day/resolvers";
import TravelResolver from "./travel/resolvers";
import WeatherResolver from "./weather/resolvers";

import buildConfig, { Configurable } from "./config";

Container.set({ id: "config", factory: buildConfig });

const schema = buildSchemaSync({
  resolvers: [DayResolver, TravelResolver, WeatherResolver],
  container: Container,
  emitSchemaFile: true,
});

type Request = {
  headers: {
    [key: string]: string;
  };
};

const server = new ApolloServer({
  //@ts-ignore
  schema,
  playground: true,
  mocks: (Container.get("config") as Configurable).mocks,
  mockEntireSchema: (Container.get("config") as Configurable).mockEntireSchema,
  context: async function ({ request }) {
    let user = null;
    const config = Container.get<Configurable>("config");

    // TODO check empty case
    const token = request.headers.authorization.split(" ").slice(-1)[0];

    try {
      // TODO check refresh token
      user = await config.authService.verifyIdToken(token);
    } catch (error) {
      console.log(error);
    }

    return { user };
  },
});

export default server.createHandler();
