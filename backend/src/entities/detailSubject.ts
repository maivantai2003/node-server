import { Column, Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./subject";
@Entity()
export class DetailSubject{
    @PrimaryGeneratedColumn('uuid')
    id!:string
    @Column()
    numericIndex!:number
    @Column()
    cofficient!:number
    @Column()
    midterm!:number
    @Column()
    final!:number
    @Column()
    total!:number
    @ManyToOne(() => Subject, (subject) => subject.detailSubjects)
    @JoinColumn({name:"subjectId"})
    subject!:Subject
}