const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routers/UserRouter.js");
const jobBoardRouter = require("./routers/JobBoardRouter.js");

var corOptions = {
  origin: "https://localhost:3000",
};

app.set("port", process.env.PORT || 3000);

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./models/index");

app.use("/api", userRouter);
app.use("/api", jobBoardRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});