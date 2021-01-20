import supertest from "supertest";
import { Connection } from "typeorm";
import { Application } from "../../src/server";
import { refreshDatabase } from "../RefreshDatabase";

describe("Authentication Api", () => {
    let request: supertest.SuperTest<supertest.Test>;
    let db: Connection;

    beforeAll(async () => {

        db = await refreshDatabase();
        const server = new Application();
        request = supertest(server.app);
    });

    afterAll(async () => {
        await db.close();
    });

    it("returns jwt", async () => {
        const response = await request.get("/auth/login");

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('jwt')
    });
});
