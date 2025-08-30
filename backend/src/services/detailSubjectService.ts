 import { DetailSubjectDto } from "../dtos/detailSubject.dto";
import { DetailSubjectUpdateDto } from "../dtos/detailSubjectUpdate.dto";
import { detailSubjectRepository } from "../repositories/detailSubjectRepository";
import { ApiError } from "../utils/ApiError";

export const detailSubjectService = {
    getAllDetailSubjects: async () => {
        try {
            return await detailSubjectRepository.getAllDetailSubjects();
        } catch (error) {
            throw ApiError.internal("Không thể lấy danh sách chi tiết môn học");
        }
    },

    getDetailSubjectById: async (detailSubjectId: string) => {
        try {
            const detailSubject = await detailSubjectRepository.getDetailSubjectById(detailSubjectId);
            if (!detailSubject) throw ApiError.notFound("Không tìm thấy chi tiết môn học");
            return detailSubject;
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw ApiError.internal("Lỗi khi lấy chi tiết môn học");
        }
    },

    createDetailSubject: async (subjectId: string, detailSubjectData: Partial<DetailSubjectDto>) => {
        try {
            if (!subjectId) throw ApiError.badRequest("Thiếu subjectId để gán chi tiết môn học");
            return await detailSubjectRepository.createDetailSubject(subjectId, detailSubjectData);
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw ApiError.internal("Lỗi khi tạo chi tiết môn học");
        }
    },

    updateDetailSubject: async (detailSubjectId: string, detailSubjectData: Partial<DetailSubjectUpdateDto>) => {
        try {
            const updated = await detailSubjectRepository.updateDetailSubject(detailSubjectId, detailSubjectData);
            if (!updated) throw ApiError.notFound("Không tìm thấy chi tiết môn học để cập nhật");
            return updated;
        } catch (error) {
            if (error instanceof ApiError) throw error;
            console.log(error);
            throw ApiError.internal("Lỗi khi cập nhật chi tiết môn học");
        }
    },

    deleteDetailSubject: async (detailSubjectId: string) => {
        try {
            const deleted = await detailSubjectRepository.deleteDetailSubject(detailSubjectId);
            if (!deleted) throw ApiError.notFound("Không tìm thấy chi tiết môn học để xóa");
            return { message: "Xóa chi tiết môn học thành công" };
        } catch (error) {
            if (error instanceof ApiError) throw error;
            throw ApiError.internal("Lỗi khi xóa chi tiết môn học");
        }
    }
};
