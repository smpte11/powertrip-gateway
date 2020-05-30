import "reflect-metadata";

import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "apollo-server-azure-functions";

import { Container } from "typedi";

import DayResolver from "./day/resolvers";
import TravelResolver from "./travel/resolvers";
import WeatherResolver from "./weather/resolvers";

import buildConfig, { Configurable } from "./config";
import { admin } from "firebase-admin/lib/auth";

type Request = {
  headers: {
    [key: string]: string;
  };
};

type ContextType = {
  user: admin.auth.UserInfo;
};

Container.set({ id: "config", factory: buildConfig });

const schema = buildSchemaSync({
  resolvers: [DayResolver, TravelResolver, WeatherResolver],
  container: Container,
  emitSchemaFile: true,
});

const server = new ApolloServer({
  //@ts-ignore
  schema,
  playground: true,
  mocks: (Container.get("config") as Configurable).mocks,
  mockEntireSchema: (Container.get("config") as Configurable).mockEntireSchema,
  context: async function ({ request }: { request: Request }) {
    const config = Container.get<Configurable>("config");
    const token = request.headers.authorization.split(" ").slice(-1)[0];

    try {
      const decodedToken = await config.authService.verifyIdToken(token);
      const user = await config.authService.getUser(decodedToken.uid);
      return { user };
    } catch (error) {
      return {};
    }
  },
});

export default server.createHandler();
