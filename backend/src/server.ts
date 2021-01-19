import express from "express";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { TestController } from "./sample.controller";

export class SampleServer extends Server {
  constructor() {
    super(process.env.NODE_ENV === "development"); // setting showLogs to true
    this.app.use(express.json());
    this.setupControllers();
  }

  private setupControllers(): void {
    const c = new TestController();

    super.addControllers([c]);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp("Server listening on port: " + port);
    });
  }
}
