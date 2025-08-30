import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  accessToken: string;
  @Column()
  refreshToken: string;
  @Column()
  createAt!:Date;
  @Column({type: 'timestamp'})
  expiresAt: Date;
  @ManyToOne(() => User, (user) => user.tokens,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: "userId" })
  user:User
}