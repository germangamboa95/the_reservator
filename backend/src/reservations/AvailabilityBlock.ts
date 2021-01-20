import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Restaurant } from "../restaurants/Restaurant";

@Entity()
export class AvailabilityBlock {
  @PrimaryColumn("uuid")
  @ManyToOne(() => Restaurant, restaurant => restaurant)
  restaurant: Restaurant;

  @Column()
  start_at: Date;

  @Column()
  end_at: Date;
}
