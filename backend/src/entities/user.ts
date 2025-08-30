import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Subject } from "./subject";
import { RefreshToken } from "./refreshToken";
import { UserSession } from "./userSession";
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column({type:"varchar", unique:true})
    name!: string;
    @Column({type:"varchar", unique:true})
    email!: string;
    @Column({type:"int",default:18})
    age!: number
    @Column()
    password!:string;
    @Column({type:"varchar",default:"user"})
    role!:string
    @Column({type:"boolean",default:true})
    isActive!:boolean
    @CreateDateColumn()
    createAt!:Date;
    @UpdateDateColumn()
    updateAt!:Date;
    @OneToMany(() => Subject, (subject) => subject.user)
    subjects!:Subject[];
    @OneToMany(()=>RefreshToken,(refreshToken)=>refreshToken.user)
    tokens!:RefreshToken[];
    @OneToMany(()=>UserSession,(userSession)=>userSession.user)
    sessions!:UserSession[];
}