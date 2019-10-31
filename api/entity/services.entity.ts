import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Services {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public sePrice!: number;

  @Column()
  public seTitle!: string;

  @Column()
  public seDescription!: string;
    
}