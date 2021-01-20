import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "../restaurants/Restaurant";
import { dateTransformer } from "../utils";



@Entity()
export class AvailabilityBlock {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("uuid")
  restaurantId: string
  @ManyToOne(() => Restaurant, restaurant => restaurant.availabilityBlocks)
  restaurant: Restaurant;

  @Column({
    transformer: dateTransformer,
    type: 'datetime'
  })
  start_at: string;

  @Column({
    transformer: dateTransformer,
    type: 'datetime'
  })
  end_at: string;

  @Column()
  capacity: number;

  reservation_count?: number
}
