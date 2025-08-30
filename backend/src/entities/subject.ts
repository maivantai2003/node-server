import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { DetailSubject } from "./detailSubject";
@Entity()
export class Subject{
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    subjectName!:string
    @Column()
    progress!:number
    @Column()
    numericIndex!:number
    @Column()
    isCompleted:boolean=false
    @Column()
    isPassed:boolean=false
    @ManyToOne(() => User, (user) => user.subjects)
    @JoinColumn({name:"userId"})
    user!:User
    @OneToMany(() => DetailSubject, (detailSubject) => detailSubject.subject)
    detailSubjects!:DetailSubject[];
}