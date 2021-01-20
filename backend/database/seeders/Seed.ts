import { initDatabase } from "../../src/database";
import { RestaurantFactory } from "../factories/ResturantFactory";


initDatabase().then(async connection => { 


    const restaurant = await RestaurantFactory().create()


})