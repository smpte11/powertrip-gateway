import "reflect-metadata";

import { buildSchemaSync, GraphQLISODateTime } from "type-graphql";
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

const server = new ApolloServer({
  //@ts-ignore
  schema,
  playground: true,
  mocks: (Container.get("config") as Configurable).mocks,
  mockEntireSchema: (Container.get("config") as Configurable).mockEntireSchema,
});

export default server.createHandler();
