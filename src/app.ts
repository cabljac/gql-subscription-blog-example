import { createClient } from "graphql-ws";
import { PORT, start } from "./server.js";
//@ts-ignore
import ws from "ws";
import performSubscription from "./performSubscription.js";

start();

const client = createClient({
  url: `ws://localhost:${PORT}/graphql`,
  webSocketImpl: ws,
});

performSubscription(client, `subscription { counter }`);
