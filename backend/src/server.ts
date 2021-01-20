import express from "express";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { RestaurantController } from "./restaurants";
import { ReservationController } from "./reservations";
import { AuthenticationController } from "./authentication/AuthenticationController";
import { AvailabilityBlockController } from "./reservations/AvailabilityBlockController";
import cors from "cors"

export class Application extends Server {
  constructor() {
    super(process.env.NODE_ENV === "development"); // setting showLogs to true
    this.app.use(express.json());
    this.app.use(cors())
    this.setupControllers();
  }

  private setupControllers(): void {
    super.addControllers([
      new RestaurantController(),
      new ReservationController(),
      new AuthenticationController(),
      new AvailabilityBlockController()
    ]);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp("Server listening on port: " + port);
    });
  }
}
