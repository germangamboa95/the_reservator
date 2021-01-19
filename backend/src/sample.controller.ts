import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller("test")
export class TestController {
  @Get("")
  protected async get(req: Request, res: Response) {
    return res.sendStatus(200);
  }
}
