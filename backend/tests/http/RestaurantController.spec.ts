import { JwtManager } from "@overnightjs/jwt";
import supertest from "supertest";
import { Connection } from "typeorm";
import { Application } from "../../src/server";
import { refreshDatabase } from "../RefreshDatabase";

const token = JwtManager.jwt({
    restaurant_id: 'restaurant1'
})


describe("Restaurant Api", () => {
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

    it("validates restaurant creation, should fail", async () => {
        const response = await request.post("/restaurants")
            .send({})
            .set('Authorization', `Bearer ${token}`);


        expect(response.status).toBe(422)
    });
});
