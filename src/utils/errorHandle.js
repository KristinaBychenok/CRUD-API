export const error404Handle = (_req, res, text) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end(text);
};

export const error400Handle = (_req, res, text) => {
  res.statusCode = 400;
  res.setHeader("Content-Type", "text/plain");
  res.end(text);
};

export const error500Handle = (_req, res, text) => {
  res.statusCode = 500;
  res.setHeader("Content-Type", "text/plain");
  res.end(text);
};
