import {
    IBaseResponseService,
    IPaginationRequest,
    IPaginationResponse,
  } from "@smpm/models";
import { DocVendorModel } from "@smpm/models/documentModel";
   import axios from "@smpm/services/axios";
  
  export const findAll = async (
    params: IPaginationRequest
  ): Promise<IBaseResponseService<IPaginationResponse<DocVendorModel>>> => {
    const response = await axios.get("/document-vendor", { params });
    return response.data;
  };
  
  export const findOne = async (id: number): Promise<IBaseResponseService<DocVendorModel>> => {
    const response = await axios.get(`/document-vendor/${id}`);
    return response.data;
  }
  
  export const update = async (
    id: number,
    updateApproveDto: FormData
  ): Promise<IBaseResponseService<DocVendorModel>> => {
    const response = await axios.patch(`/document-vendor/${id}`, updateApproveDto, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  export const deleteFile = async (id: number, fileKey: 'file1' | 'file2') => {
    const response = await axios.delete(`/document-vendor/${id}/file/${fileKey}`);
    return response.data;
  };
  
export const download = async (id: number, fileKey: 'file1' | 'file2'): Promise<{  
  data: Blob;  
  fileName: string;  
  fileExtension: string;  
}> => {  
  const response = await axios.get(`/document-vendor/${id}/download/${fileKey}`, {  
    responseType: 'blob',  
  });  

  const fileName = response.headers['content-disposition']?.split('filename=')[1];  
  const fileExtension = response.headers['content-type'].split('/')[1];  

  return {  
    data: response.data,  
    fileName: fileName?.replace(/"/g, ''),  
    fileExtension,  
  };  
}; 
  export const remove = async (id: number): Promise<IBaseResponseService<void>> => {
    const response = await axios.delete(`/document-vendor/${id}`);
    return response.data;
  }