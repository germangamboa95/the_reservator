import { initDatabase } from "./database";
import { Application } from "./server";


const port = process.env.BACKEND_PORT ? +process.env.BACKEND_PORT : 8888


if (
  process.env.NODE_ENV !== 'test'
) {
  const boot = async () => {
    await initDatabase();
    new Application().start(port);
  };

  boot();
}

