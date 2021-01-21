import { ClassWrapper, Controller, Post } from "@overnightjs/core";
import { JwtManager } from "@overnightjs/jwt";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { RestaurantRepository } from "../restaurants/RestaurantRepository";

@Controller("auth")
@ClassWrapper(expressAsyncHandler)
export class AuthenticationController {
    @Post("login")
    protected async test(req: Request, res: Response) {


        // We are pretending that we loged in a user.
        // We create a restaurant in the seeder with a static id. 
        // We still check with a find or fail just incase seeder was not ran.
        const restaurant = await RestaurantRepository().findOneOrFail({
            id: 'restaurant1'
        })

        // Might want to replace this with an async token builder
        const jwt = JwtManager.jwt({
            restaurant_id: restaurant.id
        })

        return res.json({
            jwt
        });
    }

}
