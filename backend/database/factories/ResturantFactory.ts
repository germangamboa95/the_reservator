import faker from "faker"
import { Restaurant } from "../../src/restaurants/Restaurant";
import { BaseFactory } from "./BaseFactory";



class Factory extends  BaseFactory<Restaurant> {

    protected definition() : Partial<Restaurant> {
        return {
            name: faker.company.companyName(), 
        }
    }
 
}

export const RestaurantFactory = () => new Factory(Restaurant)