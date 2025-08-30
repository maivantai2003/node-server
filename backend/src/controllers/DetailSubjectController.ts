import { NextFunction, Request, Response } from "express";
import { detailSubjectService } from "../services/detailSubjectService";
import { DetailSubjectDto } from "../dtos/detailSubject.dto";

export const DetailSubjectController = {
    getDetailSubject: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            var detailSubject = await detailSubjectService.getAllDetailSubjects()
            res.status(200).json(detailSubject)
        } catch (error) {
            next(error)
        }
    },
    getDetailSubjectById: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            var detailSubject = await detailSubjectService.getDetailSubjectById(req.params.id)
            res.status(200).json(detailSubject)
        } catch (error) {
            next(error)
        }
    },
    deleteDetailSubject: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            var result = await detailSubjectService.deleteDetailSubject(req.params.id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    },
    createDetailSubject: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const detailSubjectData:DetailSubjectDto = req.body;
            var detailSubject = await detailSubjectService.createDetailSubject(detailSubjectData.subjectId,detailSubjectData)
            res.status(201).json(detailSubject)
        } catch (error) {
            next(error)
        }
    },
    updateDetailSubject: async(req:Request,res:Response,next:NextFunction)=>{
        try {
            var detailSubject = await detailSubjectService.updateDetailSubject(req.params.id,req.body)
            res.status(200).json(detailSubject)
        } catch (error) {
            next(error)
        }
    }
}