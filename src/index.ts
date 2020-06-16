import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";
import path from "path";
import { Application } from "express";

createConnection().then(async () => {
  const app: Application = await createExpressServer({
    routePrefix: "/api",
    controllers: [path.join(__dirname + "../controllers/**/*.ts")],
  });

  app.listen(5000, () => {
    console.log("Server is running on PORT 5000");
  });
});
