import "reflect-metadata";

import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "apollo-server-azure-functions";

import { Container } from "typedi";

import DayResolver from "./day/resolvers";

import buildConfig, { Configurable } from "./config";
import path from "path";

Container.set({ id: "config", factory: buildConfig });

const schema = buildSchemaSync({
  resolvers: [DayResolver],
  container: Container,
  emitSchemaFile: (Container.get("config") as Configurable).emitSchema
});

const server = new ApolloServer({
  //@ts-ignore
  schema,
  playground: true,
  mocks: (Container.get("config") as Configurable).mocks,
  mockEntireSchema: (Container.get("config") as Configurable).mockEntireSchema
});

export default server.createHandler({});
