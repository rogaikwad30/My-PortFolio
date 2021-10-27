const mongoose = require("mongoose");

//mongodb+srv://rohan:rohan@cluster0.px4i0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(`mongodb+srv://rohan:rohan@cluster0.px4i0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
        console.error(err);
      });
  }
}

module.exports = new Database();
