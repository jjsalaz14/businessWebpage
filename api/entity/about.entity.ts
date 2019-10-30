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

  @Column()
  public phoneNumber!: string;

  @Column()
  public street!: string;

  @Column()
  public city!: string;

  @Column()
  public stateName!: string;

  @Column()
  public zipcode!: string;
  
}