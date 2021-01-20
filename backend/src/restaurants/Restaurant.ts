import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AvailabilityBlock } from "../reservations/AvailabilityBlock";
import { Reservation } from "../reservations/Reservation";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Reservation, reservation => reservation.restaurant)
  reservations: Reservation[]

  @OneToMany(() => AvailabilityBlock, block => block.restaurant)
  availabilityBlocks: AvailabilityBlock
}
 