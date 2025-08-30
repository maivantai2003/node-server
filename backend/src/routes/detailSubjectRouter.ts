import { Router } from "express";
import { authentication } from "../middlewares/authentication";
import { DetailSubjectController } from "../controllers/DetailSubjectController";

export const detailSubjectRouter = Router();
detailSubjectRouter.use(authentication);
detailSubjectRouter.get("/",DetailSubjectController.getDetailSubject);
detailSubjectRouter.get("/:id",DetailSubjectController.getDetailSubjectById);
detailSubjectRouter.post("/",DetailSubjectController.createDetailSubject);
detailSubjectRouter.put("/:id",DetailSubjectController.updateDetailSubject);  
detailSubjectRouter.delete("/:id",DetailSubjectController.deleteDetailSubject);