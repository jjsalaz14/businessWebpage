import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class About {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public mHours!: string;

  @Column()
  public tHours!: string;

  @Column()
  public wHours!: string;

  @Column()
  public rHours!: string;

  @Column()
  public fHours!: string;

  @Column()
  public saHours!: string;

  @Column()
  public suHours!: string;
  
}