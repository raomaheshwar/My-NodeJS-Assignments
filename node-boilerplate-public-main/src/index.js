var http = require("http");
const httpServer = http.createServer(handleServer);

function handleServer(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  // if(req.url == "/"){
  //   res.send()
  // }
  if (req.url === "/welcome") {
    res.end("Welcome to Dominos!");
  } else if (req.url === "/contact") {
    res.setHeader("Content-Type", "application/json");
    const contactInfo = {
      phone: "18602100000",
      email: "guestcaredominos@jublfood.com", 
    };
    res.end(JSON.stringify(contactInfo));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
}

httpServer.listen(8081, () => {
  console.log("Server is running on port 8081");
});
module.exports = httpServer;
