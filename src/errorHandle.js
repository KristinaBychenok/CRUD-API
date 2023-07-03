export const errorHandle = (_req, res) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Sorry, we can't find this page!");
};
