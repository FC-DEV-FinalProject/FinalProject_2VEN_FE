import { apiClient, createFormDataRequest } from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';

export interface UploadFileProps {
  role: string | null;
  token: string | null;
  fileItem: File;
}

export const fetchUploadIconFile = async ({ role, token, fileItem }: UploadFileProps) => {
  const formData = createFormDataRequest({ file: fileItem });

  try {
    const res = await apiClient.post(`${API_ENDPOINTS.FILES.ICON}/upload`, formData, {
      headers: {
        Auth: role,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to upload icon image');
  }
};

export const fetchPutIconFile = async (
  fileUrl: string,
  { role, token, fileItem }: UploadFileProps
) => {
  const formData = createFormDataRequest({ file: fileItem });

  try {
    const res = await apiClient.post(`${API_ENDPOINTS.FILES.ICON}/modify`, formData, {
      params: {
        fileUrl: decodeURIComponent(fileUrl),
      },
      headers: {
        Auth: role,
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to upload icon image');
  }
};

export const fetchDeleteIcon = async (role: string | null, fileUrl: string) => {
  try {
    const res = await apiClient.delete(`${API_ENDPOINTS.FILES.ICON}`, {
      params: {
        fileUrl: decodeURIComponent(fileUrl),
      },
      headers: {
        Auth: role,
      },
    });
    return res.data;
  } catch (error) {
    console.error('failed to delete icon image');
  }
};
