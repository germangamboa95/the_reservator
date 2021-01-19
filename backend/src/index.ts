import { initDatabase } from "./database";
import { Application } from "./server";

const boot = async () => {
  await initDatabase();
  new Application().start(8080);
};

boot();
