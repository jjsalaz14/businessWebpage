import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public expiresAt!: Date;

  @OneToOne((type) => User, {onDelete: "CASCADE"})
  @JoinColumn()
  public user!: User;
}
