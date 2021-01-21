import { IsDateString, IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
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
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsDefined()
  party_size: number;


  @Column({
    transformer: dateTransformer,
    type: "datetime"
  })
  @IsDefined()
  @IsDateString()
  scheduled_at: string | Date;
}
