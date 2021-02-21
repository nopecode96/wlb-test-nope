const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome." });
});

require("./app/routes/articles.routes")(app);
require("./app/routes/comments.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/auth.routes")(app);

const PORT = process.env.PORT || 9696;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
