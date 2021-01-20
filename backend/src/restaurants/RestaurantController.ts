import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import { RestaurantRepository } from "./RestaurantRepository";

@Controller("restaurants")
export class RestaurantController {
  @Get("")
  protected async test(req: Request, res: Response) {
    return res.json({
      message: "hello",
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
