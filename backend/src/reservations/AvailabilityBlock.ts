import { IsDateString, IsDefined, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "../restaurants/Restaurant";
import { dateTransformer } from "../utils";



@Entity()
export class AvailabilityBlock {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  restaurantId: string
  @ManyToOne(() => Restaurant, restaurant => restaurant.availabilityBlocks)
  restaurant: Restaurant;

  @Column({
    transformer: dateTransformer,
    type: 'datetime'
  })
  @IsDateString()
  start_at: string;

  @Column({
    transformer: dateTransformer,
    type: 'datetime'
  })
  @IsDateString()
  end_at: string;

  @Column()
  @IsDefined()
  capacity: number;

  reservation_count?: number
}
