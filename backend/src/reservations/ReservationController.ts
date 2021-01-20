import { ClassMiddleware, Controller, Get, Middleware, Post } from "@overnightjs/core";
import { JwtManager, ISecureRequest } from "@overnightjs/jwt";
import { formatISO9075 } from "date-fns";
import { Request, Response } from "express";
import { AvailabilityBlock } from "./AvailabilityBlock";
import { AvailabilityBlockRepository } from "./AvailabilityRespository";
import { Reservation } from "./Reservation";
import { ReservationRepository } from "./ReservationRepository";

@Controller("reservations")
@ClassMiddleware(JwtManager.middleware)
export class ReservationController {
  @Get("")
  protected async list(req: ISecureRequest, res: Response) {
    const restaurantId = req.payload.restaurant_id


    const reservations = await ReservationRepository().find({
      restaurant: { id: restaurantId }
    });
    return res.json({
      data: reservations
    });
  }

  @Post("")
  protected async store(req: ISecureRequest, res: Response) {
    const restaurantId = req.payload.restaurant_id
    const data = req.body


    const reservation: Reservation = await ReservationRepository().save({
      restaurant: restaurantId,
      ...data
    })


    return res.json({
      data: reservation
    });
  }


  @Get("times")
  protected async timelist(req: ISecureRequest, res: Response) {
    const restaurantId = req.payload.restaurant_id
    const date = req.query.date



    let timeblocksQuery = AvailabilityBlockRepository().find({ restaurantId })

    const reservationsQuery = ReservationRepository()
      .createQueryBuilder('r')
      .where(`DATE(r.scheduled_at) = :date`, { date }).getMany()


    let [timeblocks, reservations] = await Promise.all([timeblocksQuery, reservationsQuery])


    const comparisonFormat = (str: string | Date) => {


      if (typeof str === 'string') {
        str = new Date(str)
      }

      const x = formatISO9075(str, { representation: "time" })
      return new Date(`1/1/2000 ${x}`)

    }



    timeblocks = timeblocks.map(tb => {

      const start = comparisonFormat(tb.start_at)

      const end = comparisonFormat(tb.end_at)

      const partOfBlock = reservations.filter(rs => {
        const resTime = comparisonFormat(rs.scheduled_at)

        const isPartofBlock = start <= resTime && end >= resTime

        return isPartofBlock
      })

      tb.reservation_count = partOfBlock.length

      return tb
    })



    return res.json({
      data: timeblocks
    });
  }

}
