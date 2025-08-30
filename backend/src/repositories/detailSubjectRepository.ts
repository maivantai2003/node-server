import { AppDataSource } from "../data-source";
import { DetailSubjectDto } from "../dtos/detailSubject.dto";
import { DetailSubjectUpdateDto } from "../dtos/detailSubjectUpdate.dto";
import { DetailSubject } from "../entities/detailSubject";

const detailSubjectRepo = AppDataSource.getRepository(DetailSubject);

export const detailSubjectRepository = {
    getAllDetailSubjects: async () => {
        const detailSubjects = await detailSubjectRepo.find({ relations: { subject: true } });
        return detailSubjects;
    },
    createDetailSubject: async (subjectId: string, detailSubjectData: Partial<DetailSubjectDto>) => {
        const newDetailSubject = detailSubjectRepo.create({
            ...detailSubjectData,
            subject: { id: subjectId } as any
        });
        return await detailSubjectRepo.save(newDetailSubject);
    },
    getDetailSubjectById: async (detailSubjectId: string) => {
        const detailSubject = await detailSubjectRepo.findOne({ where: { id: detailSubjectId }, relations: { subject: true } });
        return detailSubject;
    },
    updateDetailSubject: async (detailSubjectId: string, detailSubjectData: Partial<DetailSubjectUpdateDto>) => {
        const updateDetailSubject: any = { ...detailSubjectData };
        console.log(detailSubjectData); 
        if (detailSubjectData.subjectId) {
            updateDetailSubject.subject = { id: detailSubjectData.subjectId };
            delete updateDetailSubject.subjectId;
        }
        console.log(updateDetailSubject);
        await detailSubjectRepo.update(detailSubjectId, updateDetailSubject);
        return await detailSubjectRepo.findOneBy({ id: detailSubjectId });
    },
    deleteDetailSubject: async (detailSubjectId: string) => {
        const result = await detailSubjectRepo.delete(detailSubjectId);
        return result.affected ?? 0
    }
}