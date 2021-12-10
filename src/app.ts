import express from "express";
import cookieParser from "cookie-parser";
import config from "config";
import cors from "cors";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import swaggerDocs from "./utils/swagger";

const port = config.get<number>("port");
const app = express();

app.use(
  cors({
    origin: config.get("origin"),
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`app is running at http://localhost:${port}`);

  await connect();

  routes(app);
  swaggerDocs(app, port);
});
