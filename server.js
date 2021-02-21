const express = require("express");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

server.get("/", (req, res) => {
    res.json({ message: "Welcome." });
});

require("./app/routes/articles.routes")(server);
require("./app/routes/comments.routes")(server);
require("./app/routes/users.routes")(server);
require("./app/routes/auth.routes")(server);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
