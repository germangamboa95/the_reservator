import { ClassErrorMiddleware, ClassMiddleware, ClassWrapper, Controller, Get, Middleware, Post } from "@overnightjs/core";
import { JwtManager, ISecureRequest } from "@overnightjs/jwt";
import { Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { defaultErrorHandler } from "../middleware/Errors";
import { Validate } from "../middleware/Validation";
import { AvailabilityBlock } from "./AvailabilityBlock";
import { AvailabilityBlockRepository } from "./AvailabilityRespository";


@Controller("availabilities")
@ClassMiddleware(JwtManager.middleware)
@ClassWrapper(expressAsyncHandler)
@ClassErrorMiddleware(defaultErrorHandler)
export class AvailabilityBlockController {
    @Get("")
    protected async list(req: ISecureRequest, res: Response) {
        const restaurantId = req.payload.restaurant_id

        const blocks = await AvailabilityBlockRepository().find({
            restaurant: { id: restaurantId }
        });
        return res.json({
            data: blocks
        });
    }


    @Post("")
    @Middleware(Validate(AvailabilityBlock))
    protected async store(req: ISecureRequest, res: Response) {
        const restaurantId = req.payload.restaurant_id
        const data = req.body


        const AvailabilityBlock: AvailabilityBlock = await AvailabilityBlockRepository().save({
            restaurantId: restaurantId,
            ...data
        })


        return res.json({
            data: AvailabilityBlock
        });
    }
}
