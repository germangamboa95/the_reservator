import { Connection } from "typeorm";
import { initDatabase } from "../../src/database";
import { AvailabilityBlockRepository } from "../../src/reservations/AvailabilityRespository";
import { ReservationFactory } from "../factories/ReservationFactory";
import { RestaurantFactory } from "../factories/ResturantFactory";



export const defaultSeeder = async (connection?: Connection) => {
    let ownConnection: Connection | undefined

    if (!connection) {
        ownConnection = await initDatabase()
    }


    const restaurant = await RestaurantFactory().create({
        id: "restaurant1"
    })



    await ReservationFactory().create({
        restaurant,
        scheduled_at: '2021-01-20 12:00:00'
    })
    await ReservationFactory().create({
        restaurant,
        scheduled_at: '2021-01-20 12:00:00'
    })
    await ReservationFactory().create({
        restaurant,
        scheduled_at: '2021-01-20 12:00:00'
    })
    await ReservationFactory().create({
        restaurant,
        scheduled_at: '2021-01-20 12:00:00'
    })

    try {

        await AvailabilityBlockRepository().save([
            {
                restaurantId: restaurant.id,
                start_at: '2019-09-18 12:00:00',
                end_at: '2019-09-18 12:15:00',
                capacity: 5

            },
            {
                restaurantId: restaurant.id,
                start_at: '2019-09-18 12:15:00',
                end_at: '2019-09-18 12:30:00',
                capacity: 5
            },
            {
                restaurantId: restaurant.id,
                start_at: '2019-09-18 12:30:00',
                end_at: '2019-09-18 12:45:00',
                capacity: 5
            },
            {
                restaurantId: restaurant.id,
                start_at: '2019-09-18 12:45:00',
                end_at: '2019-09-18 13:00:00',
                capacity: 5
            }
        ])


    } catch (error) {

        console.log(error)
    }

    if (ownConnection) {
        ownConnection.close()
    }

    return connection
}