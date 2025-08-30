import { NextFunction,Request,Response } from "express";
import { get } from "http";
import { subjectService } from "../services/subjectService";
import { SubjectDto } from "../dtos/subject.dto";
import { SubjectUpdateDto } from "../dtos/subjectUpdate.dto";

export const SubjectController = {
    getSubjects: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            var subjects = await subjectService.getAllSubjects()
            res.status(200).json(subjects)
        } catch (error) {
            next(error)
        }
    },
    getSubjectById: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            var subject = await subjectService.getSubjectById(req.params.id)
            res.status(200).json(subject)
        } catch (error) {
            next(error)
        }
    },
    createSubject: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const subjectData: SubjectDto = req.body;
            var subject = await subjectService.createSubject(subjectData.userId,subjectData)
            res.status(201).json(subject)
        } catch (error) {
            next(error)
        }
    },
    updateSubject: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            var subject = await subjectService.updateSubject(req.params.id,req.body)
            res.status(200).json(subject)
        } catch (error) {
            next(error)
        }
    },
    deleteSubject: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            var result = await subjectService.deleteSubject(req.params.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}