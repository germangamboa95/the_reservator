import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AvailabilityBlock } from "../reservations/AvailabilityBlock";
import { Reservation } from "../reservations/Reservation";
import { IsString, MinLength } from "class-validator"

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @Column()
  @IsString()
  @MinLength(2)
  name: string;

  @OneToMany(() => Reservation, reservation => reservation.restaurant)
  reservations: Reservation[]

  @OneToMany(() => AvailabilityBlock, block => block.restaurant)
  availabilityBlocks: AvailabilityBlock
}
