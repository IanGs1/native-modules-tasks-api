import http from "node:http";

import { routes } from "./routes.js";
import { acceptJSONBody } from "./middlewares/accept-json-body.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await acceptJSONBody(request, response);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = request.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = query ? extractQueryParams(query) : {};

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