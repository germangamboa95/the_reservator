import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import { getRepository, ObjectType } from "typeorm";


export const Validate = <T>(entity: ObjectType<T>) => expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data: Partial<T> = req.body


    const repo = getRepository(entity);
    const model: T = repo.create();

    for (let field in data) {
        // @ts-ignore
        model[field] = data[field];
    }




    // @ts-ignore
    await validateOrReject(model, {
        validationError: {
            target: false,
            forbidUnknownValues: true
        },
    });


    next()
})