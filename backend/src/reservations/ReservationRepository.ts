import { getRepository } from "typeorm";
import { Reservation } from "./Reservation";

export const ReservationRepository = () => getRepository(Reservation);
