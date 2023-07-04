import http from "http";
import { error404Handle } from "./src/utils/errorHandle.js";
import {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
} from "./src/endpoints.js";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  const routArray = req.url.split("/").filter((item) => !!item);
  if (routArray.length === 3) {
    switch (req.method) {
      case "GET":
        getUserById(req, res);
        break;
      case "PUT":
        updateUser(req, res);
        break;
      case "DELETE":
        deleteUser(req, res);
        break;
    }
  } else if (routArray.length === 2) {
    switch (req.method) {
      case "GET":
        getUsers(req, res);
        break;
      case "POST":
        postUser(req, res);
        break;
    }
  } else {
    error404Handle(req, res, "Sorry, we can't find this page!");
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
