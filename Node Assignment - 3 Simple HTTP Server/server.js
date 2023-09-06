const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
});


server.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});