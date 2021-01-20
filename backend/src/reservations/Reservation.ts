import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "../restaurants/Restaurant";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  party_size: number;

  @Column()
  scheduled_at: Date;
}
