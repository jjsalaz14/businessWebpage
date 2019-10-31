import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Deals {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column()
  public expiration!: number;

  @Column()
  public description!: string;
    
}