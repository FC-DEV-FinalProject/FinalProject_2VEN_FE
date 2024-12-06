import apiClient from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';

// 폴더 목록 조회
export const fetchFolderList = async (params: { page: number; pageSize: number }) => {
  try {
    const res = await apiClient.get(API_ENDPOINTS.FOLLOWING.FOLDER_LIST, {
      params: {
        page: params.page,
        pageSize: params.pageSize,
      },
    });
    return res;
  } catch (error) {
    console.error('Failed to fetch folder list data:', error);
    throw error;
  }
};

// 폴더 등록
export const submitFolderName = async (folderName: string) => {
  try {
    const res = await apiClient.post(API_ENDPOINTS.FOLLOWING.FOLDERS, { folderName });
    return res;
  } catch (error) {
    console.error('Failed to submit folder Name:', error);
    throw error;
  }
};

// 폴더명 수정
export const updateFolderName = async ({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: number;
}) => {
  try {
    const res = await apiClient.put(`${API_ENDPOINTS.FOLLOWING.FOLDERS}/${folderId}`, {
      folderName,
    });
    return res;
  } catch (error) {
    console.error('Failed to update folder name:', error);
    throw error;
  }
};

// 폴더 삭제
export const deleteFolder = async (folderId: number) => {
  try {
    const res = await apiClient.delete(`${API_ENDPOINTS.FOLLOWING.FOLDERS}/${folderId}`);
    return res;
  } catch (error) {
    console.error('Failed to delete folder:', error);
    throw error;
  }
};
