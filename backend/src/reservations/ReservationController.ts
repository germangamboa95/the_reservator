import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import { ReservationRepository } from "./ReservationRepository";

@Controller("reservations")
export class ReservationController {
  @Get("")
  protected async list(req: Request, res: Response) {
    const restaurantId = ""; // Comes from token/
    const restaurant = await ReservationRepository().find({
      restaurant: {id: restaurantId}
    });
    return res.json({
      data: { restaurant },
    });
  }
}
