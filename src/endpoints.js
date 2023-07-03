import { users } from "./usersData.js";

export const getUsers = (_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(users));
};

export const getUserById = (req, res) => {
  const userID = req.url.split("/").filter((item) => !!item)[2];
  const validUUID =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  if (!validUUID.test(userID)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end("Invalid userId");
    return;
  }

  const user = users.find((us) => us.id === userID);

  if (!user) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Sorry, we can't find this user!");
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(user));
};
