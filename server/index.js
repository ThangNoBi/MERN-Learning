require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learning.hfkyp.mongodb.net/mern-learning?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

// Môi trường development là dùng PORT 5000 còn khi production là process.env.PORT
const PORT = process.env.PORT || 5000;

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.configure(function () {
//   app.use(allowConnect);
// });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
