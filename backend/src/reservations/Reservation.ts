import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "../restaurants/Restaurant";
import { dateTransformer } from "../utils";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.reservations)
  restaurant: Restaurant;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  party_size: number;


  @Column({
    transformer: dateTransformer,
    type: "datetime"
  })
  scheduled_at: string | Date;
}
