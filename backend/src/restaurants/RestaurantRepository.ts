import { getRepository } from "typeorm";
import { Restaurant } from "./Restaurant";

export const RestaurantRepository = () => getRepository(Restaurant);
