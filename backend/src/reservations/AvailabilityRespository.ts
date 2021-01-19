import { getRepository } from "typeorm";
import { AvailabilityBlock } from "./AvailabilityBlock";

export const AvailabilityBlockRepository = () =>
  getRepository(AvailabilityBlock);
