import { Router } from "express";
import { authentication } from "../middlewares/authentication";
import { SubjectController } from "../controllers/SubjectController";

export const subjectRouter=Router();
subjectRouter.use(authentication)
subjectRouter.get("/",SubjectController.getSubjects);
subjectRouter.get("/:id",SubjectController.getSubjectById);
subjectRouter.post("/",SubjectController.createSubject);
subjectRouter.put("/:id",SubjectController.updateSubject);  
subjectRouter.delete("/:id",SubjectController.deleteSubject);