const mongoose = require("mongoose");

async function mongoDbConnection(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("mongodb connected to resume_builder"))
    .catch((err) => console.log("mongo error at resume_builder"));
}

module.exports = { mongoDbConnection };

