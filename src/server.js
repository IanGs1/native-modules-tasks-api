import http from "node:http";

import { routes } from "./routes.js";
import { acceptJSONBody } from "./middlewares/accept-json-body.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await acceptJSONBody(request, response);

  const route = routes.find(route => {
    return route.method === method && route.path === url;
  });

  if (route) {
    return route.handler(request, response);
  };

  return response
    .writeHead(404)
    .end(JSON.stringify({ message: "Wasn't possible to find your Route!" }));
});

server
  .listen(3333)
  .on("listening", () => {
    console.log("HTTP server listening on: http://localhost:3333 🚀"); 
  })