import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import withCancel from "./withCancel.js";

export const PORT = 3000;

const server = new WebSocketServer({
  port: PORT,
  path: "/graphql",
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function* iterator() {
  for (let i = 0; i <= 5; i++) {
    await sleep(1000);
    yield { counter: i };
  }
}

const onCancel = () => {
  console.log("Cancelled subscription!");
};

const resolvers = {
  Subscription: {
    counter: {
      subscribe: () => withCancel(iterator(), onCancel),
    },
  },
};

const typeDefs = `
    type Query {
        _foo: String
    }

    type Subscription {
        counter: Int
    }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export function start() {
  useServer({ schema }, server);
}
