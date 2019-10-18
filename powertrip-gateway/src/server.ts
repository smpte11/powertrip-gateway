import * as path from "path";

import { buildSchema } from "type-graphql";
import { ApolloServer, Config } from "apollo-server";

import { Container } from "typedi";

import DayResolver from "./day/resolvers";

import buildConfig, { Configurable } from "./config";

Container.set({ id: "config", factory: buildConfig });

async function server() {
  const schema = await buildSchema({
    resolvers: [DayResolver],
    container: Container,
    emitSchemaFile: path.resolve(__dirname, "schema.gql")
  });

  const server = new ApolloServer({
    //@ts-ignore
    schema,
    playground: true,
    mocks: (Container.get("config") as Configurable).mocks
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

export default server;
