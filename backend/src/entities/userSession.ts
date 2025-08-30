import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class UserSession{
    @PrimaryGeneratedColumn("uuid")
    id:string
    @Column({ type: "varchar", nullable: true })
    refreshToken:string
    @Column({ type: "varchar", nullable: true })
    deviceInfo: string; // Ví dụ: "Chrome on Windows 10"

    @Column({ type: "varchar", nullable: true })
    ipAddress: string;

    @Column({ type: "varchar", nullable: true })
    location: string; // nếu có geoIP

    @Column({ type: "boolean", default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.sessions, { onDelete: "CASCADE" })
    @JoinColumn({name:"userId"})
    user: User;
}