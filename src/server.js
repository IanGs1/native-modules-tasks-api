import http from "node:http";

const server = http.createServer(() => {});

server
  .listen(3333)
  .on("listening", () => {
    console.log("HTTP server listening on: http://localhost:3333 🚀"); 
  })