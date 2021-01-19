import express from "express";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { RestaurantController } from "./restaurants";
import { ReservationController } from "./reservations";

export class Application extends Server {
  constructor() {
    super(process.env.NODE_ENV === "development"); // setting showLogs to true
    this.app.use(express.json());
    this.setupControllers();
  }

  private setupControllers(): void {
    super.addControllers([
      new RestaurantController(),
      new ReservationController(),
    ]);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp("Server listening on port: " + port);
    });
  }
}
