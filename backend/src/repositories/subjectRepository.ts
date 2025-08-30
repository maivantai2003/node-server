
import { AppDataSource } from "../data-source";
import { SubjectDto } from "../dtos/subject.dto";
import { SubjectUpdateDto } from "../dtos/subjectUpdate.dto";
import { Subject } from "../entities/subject";
import { User } from "../entities/user";

const subjectRepo=AppDataSource.getRepository(Subject);
const userRepo = AppDataSource.getRepository(User);
export const subjectRepository = {
    getAllSubjects: async () => {
        const subjects=await subjectRepo.find({relations:{detailSubjects:true,user:true}})
        return subjects
    },
    createSubject: async (userId: string, subjectData: Partial<SubjectDto>) => {
        //const user = await userRepo.findOneBy({ id: userId });
        //if (!user) throw new Error("User not found");

        const newSubject = subjectRepo.create({
        ...subjectData,
        //user,
        user:{id:userId} as any
        });

        return await subjectRepo.save(newSubject);
    },
    getSubjectById: async (subjectId: string) => {
        const subject=await subjectRepo.findOne({where:{id:subjectId},relations:{detailSubjects:true,user:true}})
        return subject
    },
    updateSubject: async (subjectId: string, subjectData: Partial<SubjectUpdateDto>) => {
        const updatePayload: any = { ...subjectData };
        if (subjectData.userId) {
            updatePayload.user = { id: subjectData.userId };
            delete updatePayload.userId;
        }
        await subjectRepo.update(subjectId, updatePayload);
        return await subjectRepo.findOneBy({ id: subjectId });
    },
    deleteSubject: async (subjectId: string) => {
        const result = await subjectRepo.delete(subjectId);
        return result.affected ?? 0;
    }
}