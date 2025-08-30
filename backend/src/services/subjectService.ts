import { subjectRepository } from "../repositories/subjectRepository";
import { ApiError } from "../utils/ApiError";
import { Subject } from "../entities/subject";
import { SubjectDto } from "../dtos/subject.dto";
import { SubjectUpdateDto } from "../dtos/subjectUpdate.dto";

export const subjectService = {
    getAllSubjects: async (): Promise<Subject[]> => {
        try {
            return await subjectRepository.getAllSubjects();
        } catch (error) {
            throw ApiError.internal("Không thể lấy danh sách môn học");
        }
    },

    getSubjectById: async (subjectId: string): Promise<Subject> => {
        const subject = await subjectRepository.getSubjectById(subjectId);
        if (!subject) {
            throw ApiError.notFound("Không tìm thấy môn học");
        }
        return subject;
    },

    createSubject: async (userId: string, subjectData: Partial<SubjectDto>): Promise<Subject> => {
        if (!userId) throw ApiError.badRequest("Thiếu userId để gán môn học");
        try {
            const newSubject = await subjectRepository.createSubject(userId, subjectData);
            return newSubject;
        } catch (error) {
            throw ApiError.internal("Lỗi khi tạo môn học");
        }
    },

    updateSubject: async (subjectId: string, subjectData: Partial<SubjectUpdateDto>): Promise<Subject> => {
        const updated = await subjectRepository.updateSubject(subjectId, subjectData);
        if (!updated) {
            throw ApiError.notFound("Không tìm thấy môn học để cập nhật");
        }
        return updated;
    },

    deleteSubject: async (subjectId: string): Promise<{ message: string }> => {
        const deleted = await subjectRepository.deleteSubject(subjectId);
        if (!deleted) {
            throw ApiError.notFound("Không tìm thấy môn học để xóa");
        }
        return { message: "Xóa môn học thành công" };
    }
};
