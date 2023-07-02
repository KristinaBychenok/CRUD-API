import http from "http";

const PORT = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!");
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
