import { formatISO9075 } from "date-fns";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "../restaurants/Restaurant";

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
    transformer: {
      from(val) {
        return val // Return utc, client converts to own tz
      },
      to(val) {

        return formatISO9075(new Date(val))
      }
    },
    type: "datetime"
  })
  scheduled_at: string | Date;
}
