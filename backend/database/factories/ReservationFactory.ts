import { addHours } from "date-fns";
import faker, { fake } from "faker"
import { Reservation } from "../../src/reservations/Reservation";
import { BaseFactory } from "./BaseFactory";
import { RestaurantFactory } from "./ResturantFactory";



class Factory extends BaseFactory<Reservation> {

    protected definition(): Partial<Reservation> {
        return {
            restaurant: RestaurantFactory().make(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            party_size: faker.random.number(3),
            scheduled_at: faker.date.soon()
        }

    }
}
export const ReservationFactory = () => new Factory(Reservation)