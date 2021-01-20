import { initDatabase } from "./database";
import { Application } from "./server";




if (
  process.env.NODE_ENV !== 'test'
) {
  const boot = async () => {
    await initDatabase();
    new Application().start(8080);
  };

  boot();
}

