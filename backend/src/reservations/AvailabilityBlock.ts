import { formatISO9075 } from "date-fns";
import { type } from "os";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, ValueTransformer } from "typeorm";
import { Restaurant } from "../restaurants/Restaurant";


const dateTransformer: ValueTransformer = {
  from(val) {
    return val // Return utc, client converts to own tz
  },
  to(val) {

    if (typeof val === 'string') {
      val = new Date(val)
    }

    return formatISO9075(val)
  }
}

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
