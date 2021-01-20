import { JwtManager } from "@overnightjs/jwt";
import { addHours, startOfHour } from "date-fns";
import supertest from "supertest";
import { Connection } from "typeorm";
import { AvailabilityBlock } from "../../src/reservations/AvailabilityBlock";
import { Reservation } from "../../src/reservations/Reservation";
import { Application } from "../../src/server";
import { refreshDatabase } from "../RefreshDatabase";

const token = JwtManager.jwt({
    restaurant_id: 'restaurant1'
})

describe("Reservation Api", () => {
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

    it("returns existing reservations for restaurant", async () => {

        const response = await request.get("/reservations").set('Authorization', `Bearer ${token}`);



        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.data)).toBe(true)
    });

    it("makes a reservation", async () => {

        const reservation: Partial<Reservation> = {
            name: "Testing reservation",
            email: "some@email.com",
            party_size: 5,
            scheduled_at: new Date()
        }

        const response = await request.post("/reservations")
            .send(reservation)
            .set('Authorization', `Bearer ${token}`);


        const result = response.body.data

        expect(reservation.email).toBe(result.email)
        expect(response.status).toBe(200)


    })




    it('it gets available timeblocks for a date', async () => {


        const response = await request.get("/reservations/times")
            .query({
                date: '2021-01-20'
            })
            .set('Authorization', `Bearer ${token}`);


        const result = response.body.data

        expect(Array.isArray(result)).toBe(true)
        expect(response.status).toBe(200)

    })

});
