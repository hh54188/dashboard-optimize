const path = require("path");

const DELAY = 1000 * 2;

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  setTimeout(next, DELAY);
});
server.use(router);

server.listen(9090, () => {
  console.log("JSON Server is running");
});
