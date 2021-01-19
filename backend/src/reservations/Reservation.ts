import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  restaurant_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  party_size: number;

  @Column()
  scheduled_at: Date;
}
