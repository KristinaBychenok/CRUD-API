import { v4 as uuidv4 } from "uuid";
import {
  error400Handle,
  error404Handle,
  error500Handle,
} from "./utils/errorHandle.js";
import { getIsValidUUID } from "./utils/helpers.js";
import fs from "fs";

export const getUsers = async (req, res) => {
  fs.readFile("src/usersData.json", { encoding: "utf8" }, (err, data) => {
    if (err) {
      error500Handle(req, res, "Operation failed");
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  });
};

export const getUserById = (req, res) => {
  const userID = req.url.split("/").filter((item) => !!item)[2];

  if (!getIsValidUUID(userID)) {
    error400Handle(req, res, "Invalid userId");
    return;
  }

  fs.readFile("src/usersData.json", { encoding: "utf8" }, (err, data) => {
    if (err) {
      error500Handle(req, res, "Operation failed");
      return;
    }

    const user = JSON.parse(data).find((us) => us.id === userID);

    if (!user) {
      error404Handle(req, res, "Sorry, we can't find this user!");
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(user));
  });
};

export const postUser = (req, res) => {
  let requestBody = "";

  req.on("data", (chunk) => {
    requestBody += chunk;
  });

  req.on("end", () => {
    try {
      const userData = JSON.parse(requestBody);

      if (!userData.username || !userData.age || !userData.hobbies) {
        error404Handle(req, res, "Required fields missing");
        return;
      }

      const newUser = {
        id: uuidv4(),
        username: userData.username,
        age: userData.age,
        hobbies: userData.hobbies,
      };

      fs.readFile("src/usersData.json", { encoding: "utf8" }, (err, data) => {
        if (err) {
          error500Handle(req, res, "Operation failed");
          return;
        }

        fs.writeFile(
          "src/usersData.json",
          JSON.stringify([...JSON.parse(data), newUser]),
          (err) => {
            if (err) {
              error500Handle(req, res, "Operation failed");
              return;
            }
          }
        );

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(newUser));
      });
    } catch (err) {
      error400Handle(req, res, "Invalid request body");
    }
  });
};

export const updateUser = (req, res) => {
  const userID = req.url.split("/").filter((item) => !!item)[2];

  if (!getIsValidUUID(userID)) {
    error400Handle(req, res, "Invalid userId");
    return;
  }

  fs.readFile("src/usersData.json", { encoding: "utf8" }, (err, data) => {
    if (err) {
      error500Handle(req, res, "Operation failed");
      return;
    }

    const users = JSON.parse(data);
    const userIndex = users.findIndex((us) => us.id === userID);

    if (userIndex === -1) {
      error404Handle(req, res, "Sorry, we can't find this user!");
      return;
    }

    let requestBody = "";

    req.on("data", (chunk) => {
      requestBody += chunk;
    });

    req.on("end", () => {
      try {
        const userData = JSON.parse(requestBody);

        users[userIndex] = {
          ...users[userIndex],
          ...userData,
        };

        fs.writeFile("src/usersData.json", JSON.stringify(users), (err) => {
          if (err) {
            error500Handle(req, res, "Operation failed");
            return;
          }
        });

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(users[userIndex]));
      } catch (err) {
        error400Handle(req, res, "Invalid request body");
      }
    });
  });
};

export const deleteUser = (req, res) => {
  const userID = req.url.split("/").filter((item) => !!item)[2];

  if (!getIsValidUUID(userID)) {
    error400Handle(req, res, "Invalid userId");
    return;
  }

  fs.readFile("src/usersData.json", { encoding: "utf8" }, (err, data) => {
    if (err) {
      error500Handle(req, res, "Operation failed");
      return;
    }

    const users = JSON.parse(data);

    const userIndex = users.findIndex((us) => us.id === userID);

    if (userIndex === -1) {
      error404Handle(req, res, "Sorry, we can't find this user!");
      return;
    }

    const filteredUsers = users.filter((us) => us.id !== userID);

    fs.writeFile("src/usersData.json", JSON.stringify(filteredUsers), (err) => {
      if (err) {
        error500Handle(req, res, "Operation failed");
        return;
      }
    });

    res.statusCode = 204;
    res.end();
  });
};
