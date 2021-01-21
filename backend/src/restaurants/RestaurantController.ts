import { ClassErrorMiddleware, ClassWrapper, Controller, ErrorMiddleware, Get, Middleware, Post, } from "@overnightjs/core";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { defaultErrorHandler } from "../middleware/Errors";
import { Validate } from "../middleware/Validation";
import { Restaurant } from "./Restaurant";
import { RestaurantRepository } from "./RestaurantRepository";

@Controller("restaurants")
@ClassWrapper(expressAsyncHandler)
@ClassErrorMiddleware(defaultErrorHandler)
export class RestaurantController {

  @Post()
  @Middleware(Validate(Restaurant))
  protected async store(req: Request, res: Response) {
    const data = req.body

    const restaurant: Restaurant = await RestaurantRepository().save({
      ...data
    })

    return res.json({
      data: restaurant
    });
  }

  @Get(":id")
  protected async show(req: Request, res: Response) {
    const { id } = req.params;
    const restaurant = await RestaurantRepository().findOneOrFail(id);
    return res.json({
      data: { restaurant },
    });
  }
}
