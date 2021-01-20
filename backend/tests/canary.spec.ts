import supertest from "supertest";
import { Application } from "../src/server";

describe("test", () => {
  let request: supertest.SuperTest<supertest.Test>;
  beforeAll(async () => {
    // db = await initDb();
    const server = new Application();
    request = supertest(server.app);
  });

  afterAll(async () => {
    // await db.close();
  });

  it("test", async () => {
    const response = await request.get("/restaurants");

    console.log(response.body);
  });
});
