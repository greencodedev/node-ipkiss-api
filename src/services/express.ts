import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import logger from "morgan";

import routes from "../routes";
import config from "../config";

const app = express();

const bodyParserObject = {
  extended: true,
  limit: "50mb",
};

app.use(logger("dev"));
app.use(helmet());
app.use(bodyParser.json(bodyParserObject));

app.use("/", routes);

export default {
  app: app,
  start: async () => {
    app.listen(config.PORT, () => {
      console.log(`Server started on port ${config.PORT}`);
    });
  },
};
