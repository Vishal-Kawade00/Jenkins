const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {

    // Home route
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Welcome to Jenkins CI/CD Demo Server 🚀");
    }

    // About route
    else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("This server is deployed using Jenkins Pipeline.");
    }

    // Health check (used in CI/CD)
    else if (req.url === "/health" && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ status: "Server is running", uptime: process.uptime() }));
    }

    // Terminate server route
    else if (req.url === "/terminate" && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("Server is shutting down...");

        console.log("Server termination requested");

        server.close(() => {
            console.log("Server stopped successfully");
            process.exit(0);
        });
    }

    // 404 route
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Route not found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});