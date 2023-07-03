import http from "http";
import { errorHandle } from "./src/errorHandle.js";
import { getUsers, getUserById } from "./src/endpoints.js";

const PORT = 4000;

const server = http.createServer((req, res) => {
  const routArray = req.url.split("/").filter((item) => !!item);

  if (routArray.length === 3 && req.method === "GET") {
    getUserById(req, res);
  } else if (routArray.length === 2 && req.method === "GET") {
    getUsers(req, res);
  } else {
    errorHandle(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
