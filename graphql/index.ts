import "reflect-metadata";

import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "apollo-server-azure-functions";

import { Container } from "typedi";

import DayResolver from "./day/resolvers";

import buildConfig, { Configurable } from "./config";

Container.set({ id: "config", factory: buildConfig });

const schema = buildSchemaSync({
  resolvers: [DayResolver],
  container: Container
});

const server = new ApolloServer({
  //@ts-ignore
  schema,
  playground: true
  // mocks: (Container.get("config") as Configurable).mocks,
  // mockEntireSchema: false
});

export default server.createHandler({});
