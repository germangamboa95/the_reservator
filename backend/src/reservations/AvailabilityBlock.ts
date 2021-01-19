import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AvailabilityBlock {
  @PrimaryColumn("uuid")
  restaurant_id: string;

  @Column()
  start_at: Date;

  @Column()
  end_at: Date;
}
